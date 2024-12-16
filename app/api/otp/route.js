import { NextResponse } from 'next/server'

const nodemailer = require('nodemailer')
const optverify = require('../../../backend/models/email-verify')
import connectdb from "../../../backend/config/db.config";

export const POST = async req => {
  try {
    await connectdb()
    const { email } = await req.json()

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    })

    const otp = Math.round(1000 + Math.random() * 9000)

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Email',
      html: `<!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>OTP Verification</title>
                </head>
                <body>
                    <p>Enter the OTP below to verify your email:</p>
                    <p>
                        <span style="font-weight: bold; font-size: 32px;">${otp}</span>
                    </p>
                    <p>If you didn't request this, please ignore this email.</p>
                </body>
                </html>`
    }

    await transporter.sendMail(mailOptions)

    await optverify.create({
      otp: otp,
      email,
      createdAt: Date.now(),
      expiredAt: Date.now() + 600 * 1000
    })

    return NextResponse.json({ message: 'mail sent', success: true})
  } catch (error) {
    return NextResponse.json({
      message: error.message || 'something went wrong',
      success: false
    })
  }
}
