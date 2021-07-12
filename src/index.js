const Koa = require('koa')
const koaBodyParser = require('koa-bodyparser')
const koaViews = require('koa-views')
const koaStatic = require('koa-static')
const koaSession = require('koa-session')
const mongoStore = require('koa-session-mongo2')
const koaLogger = require('koa-logger')

const _config = require('../config')
const router = require('./controllers')

global._ = require('lodash')
global.model = require('./models')

const app = new Koa()

// 服务器运行log
app.use(koaLogger())

// 指定静态目录
app.use(koaStatic(_config.static))

// 指定views路径
app.use(
    koaViews(_config.views, {
        map: {
            html: 'lodash',
        },
    })
)

// 解析报文的body
app.use(
    koaBodyParser({
        enableTypes: ['json', 'form', 'text'],
    })
)

// session初始化
app.use(
    koaSession(
        {
            key: 'makefuture_sess',
            store: new mongoStore(_config.sessionURL),
            signed: false,
            // cookie过期时间，由浏览器负责到时清除，单位毫秒
            maxAge: 5 * 24 * 60 * 60 * 1000,
        },
        app
    )
)

// 使用router
app.use(router.routes(), router.allowedMethods())

console.log('启动端口：', _config.port)

app.listen(_config.port)
