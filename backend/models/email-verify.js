const mongoose = require('mongoose')

const otpSchema = new mongoose.Schema({
    email: String,
    otp: Number,
    createdAt: String,
    expiredAt: String
})

const emailverify = mongoose.models.emailverify || mongoose.model('emailverify', otpSchema)

module.exports = emailverify