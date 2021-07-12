const { getResponse } = require('./index')
const { model } = require('mongoose')

exports.checkLogin = async (ctx, next) => {
    const {userid=""} = ctx.session || {}
    if(!userid){
        ctx.body = getResponse(false, 'e504')
        return
    }
    await next()
}

// session存储
exports.SessStoreUser = async (ctx, next) => {
  const {userid=""} = ctx.session || {}
  console.log('--->>', userid)
}

exports.JustForWeChat = async (ctx, next) => {
    const { referer, 'user-agent': userAgent } = ctx.request.headers
    const isWeChat =
        userAgent &&
        /MicroMessenger/gi.test(userAgent) &&
        referer &&
        _.includes(referer, ctx.session.appId)
    if (!isWeChat) {
        ctx.body = getResponse(false, 'e505')
        return
    }
    await next()
}
