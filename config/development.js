const port = Number.parseInt(process.env.PORT) || 6060
// 根据自己的实际参数填写
const mongoUri =
    'mongodb://{{username}}:{{password}}@{{ip}}:{{port}}/?authSource=admin'
const root = 'local path'
const host = 'http://localhost:6060'
module.exports = {
    host,
    port,
    cdn: 'https://cdn.izelas.run',
    hostName: 'makefuture.app',
    home: root,
    static: `${root}/static`,
    views: `${root}/src/views`,
    mongoUri,
    dbName: 'makefuture',
    // 存放session的库和表配置
    sessionURL: {
        url: `${mongoUri}&poolSize=5&useUnifiedTopology=true&useNewUrlParser=true`,
        db: 'makefuture',
        collection: 'session',
        // 这里设置的是数据库session定期清除的时间，与cookie的过期时间应保持一致，cookie由浏览器负责定时清除，需要注意的是索引一旦建立修改的时候需要删除旧的索引。此处的时间是秒为单位，cookie的maxAge是毫秒为单位
        maxAge: 24 * 60 * 60,
    }
}
