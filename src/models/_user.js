const model = {
    name: 'user',
    schema: {
        nick_name: String, // 昵称
        phone: String, // 手机
        pass: String, // 密码
        avatar_url: String, // 头像
        sms_code: Number, // 短信登录码
        expire_at: Number, // 验证码过期时间
        create_at: Number, // 创建时间
    },
}

module.exports = model