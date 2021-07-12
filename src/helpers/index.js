const crypto = require('crypto')
const fs = require('fs')
const moment = require('moment')
const errors = require('./errors')

exports.getUuid = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4()
}

exports.getShortStr = function () {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1)
    }

    return s4() + s4()
}

exports.getResponse = function (success, e) {
    if (success) {
        return {
            data: e || {},
            code: 0,
            success: true,
        }
    } else {
        return {
            success: false,
            code: e || '',
            message: errors[e] || '未知错误！',
        }
    }
}

exports.fmtp = function(){
    return console.log('[INFO]', moment().format('YYYY-MM-DD HH:mm:SS'), ' ::1 ', ...arguments)
}

// 校验手机号码格式是否正确
exports.checkPhone = function (phone) {
    if (!phone) return false
    const reg = new RegExp(
        /^(13[0-9]|15[012356789]|17[0-9]|18[0-9]|14[57])[0-9]{8}$/
    )
    if (!reg.test(+phone)) {
        return false
    } else {
        return true
    }
}

// 获取ip地址
exports.getAcessRealIP = (req) => {
    return (
        req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
    )
}

exports.getJSONFile = (filepath) => {
    try {
        let res = fs.readFileSync(filepath)
        return JSON.parse(res.toString())
    } catch (error) {
        console.log('读取文件---->', error)
        return {}
    }
}

// 微信信息解密方法
exports.wxBizDataCrypt = (appId, sessionKey, encryptedData, iv) => {
  // base64 decode
  sessionKey = new Buffer(sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')

  try {
     // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    
    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

