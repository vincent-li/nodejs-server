const Router = require('@koa/router')
const router = Router()



// 用户登录接口
const user = require('./_user')

// 系统页面
const views = require('./_views')

const routes = [views, user]

for (route of routes) {
  router.use(route.routes(), route.allowedMethods())
}

module.exports = router
