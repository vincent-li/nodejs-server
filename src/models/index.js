const mongoose = require('mongoose')
const { mongoUri, dbName } = require('../../config')

mongoose.Promise = global.Promise

const conn = mongoose.createConnection(mongoUri, {
    dbName,
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

const db = {}
const user = require('./_user')
const models = [user]

models.forEach((item) => {
    let newSchema = new mongoose.Schema(
        (typeof item.schema === 'function' && item.schema(mongoose.Schema)) ||
            item.schema,
        { collection: item.name }
    )
    db[item.name] = conn.model(item.name, newSchema)
})

module.exports = db
