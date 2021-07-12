const { getResponse} = require('../helpers')
const { checkLogin } = require('../helpers/plugin')

const userLogin = async (ctx) => {
  const { type, phone, code, pass } = ctx.request.body
  if (!(type && phone)) {
    ctx.body = getResponse(false, 'e501')
    return
  }

  if ((type === 1 && !pass) || (type === 2 && !code)) {
    ctx.body = getResponse(false, 'e501')
    return
  }
  let u = ''
  let bo = ''
  // 账号密码
  if (type.toString() === '1') {
    u = await model.user.findOne({ phone, pass }).lean()
    if (!(u && u._id)) {
      ctx.body = getResponse(false, 'e554')
      return
    }
  }
  // 手机验证码方式
  if (type.toString() === '2') {
    u = await model.user.findOne({ phone, sms_code: code }).lean()
    if (u && u._id) {
      if (u.expire_at < Date.now()) {
        ctx.body = getResponse(false, 'e555')
        return
      }
    } else {
      ctx.body = getResponse(false, 'e554')
      return
    }
  }

  bo = {
    userid: u._id.toString(),
    nick_name: u.nick_name,
    avatar_url: u.avatar_url,
  }
  ctx.session = bo
  ;(bo.hasPass = u.pass ? true : false), (ctx.body = getResponse(true, bo))

  return
}

const userLoginOut = async (ctx) => {
  ctx.session.userid = ''
  ctx.body = getResponse(true, '已登出')
}

const userInfo = async (ctx) => {
  let user = await model.user.findById(ctx.session.userid).lean()
  let res = {
    userid: user._id.toString(),
    nick_name: user.nick_name,
    avatar_url: user.avatar_url,
    create_at: user.create_at,
    hasPass: user.pass ? true : false,
  }
  ctx.body = getResponse(true, res)
  return
}

const userUpdateInfo = async (ctx) => {
    const { userid } = ctx.session
    const { nick_name, pass, confirm_pass } = ctx.request.body
    let user = {}
    if(nick_name) user.nick_name = nick_name
    if(pass && confirm_pass && pass === confirm_pass) user.pass = confirm_pass
    let res = await model.user.updateOne({_id: userid}, user)
    if(res && res.ok){
        ctx.body = getResponse(true, '操作成功')
    }else{
        ctx.body = getResponse(false, 'e500')
    }
    return
}

/**
 * 路由定义
 */
const Router = require('@koa/router')
const router = Router({
  prefix: '/api/user',
})

/**
 * 用户登录
 * @path - /api/user/login
 * @method - POST
 * @params
 *  type - 登录方式，1 - 账号密码 2 - 手机验证码
 *  phone - 用户手机号
 *  code - 验证码
 *  pass - 密码
 * @returns
 *  data - {} - 用户信息，昵称，头像
 *  code - 0 || 500,
 *  success - true | false,
 *  message - ''
 */

router.post('/login', userLogin)

/**
 * 用户登出
 * @path - /api/user/loginout
 * @method - POST
 * @params
 * @returns
 *  data - {} - 用户信息，昵称，头像
 *  code - 0 || 500,
 *  success - true | false,
 *  message - ''
 */

router.post('/loginout', checkLogin, userLoginOut)

/**
 * 获取用户信息
 * @path - /api/user/info
 * @method - POST
 * @params
 * @returns
 *  data - {} - 用户信息，昵称，头像
 *  code - 0 || 500,
 *  success - true | false,
 *  message - ''
 */

router.post('/info', checkLogin, userInfo)

/**
 * 用户修改信息
 * @path - /api/user/update/info
 * @method - POST
 * @params
 *  nick_name - 昵称
 *  pass - 密码
 *  confirm_pass
 * @returns
 *  data - {} - 用户信息，昵称，头像
 *  code - 0 || 500,
 *  success - true | false,
 *  message - ''
 */

router.post('/update/info', checkLogin, userUpdateInfo)

module.exports = router
