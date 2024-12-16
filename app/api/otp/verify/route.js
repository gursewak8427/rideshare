import { NextResponse } from 'next/server'

const optverify = require('../../../../backend/models/email-verify')
const userModel = require('../../../../backend/models/users')
import connectdb from "../../../../backend/config/db.config";

export const POST = async req => {
  try {
    await connectdb()
    const data = await req.json()

    if (!data.email || !data.otp) {
      return NextResponse.json({ message: 'fields are required to verify otp', success: false })
    }

    const user = await optverify
      .findOne({ email: data?.email })
      .sort({ createdAt: -1 })
      .limit(1)

    if (!user) {
      return NextResponse.json({ message: 'no such user found', success: false })
    }

    if (user.expiredAt <= Date.now()) {
      return NextResponse.json({ message: 'otp has expired', success: false })
    }

    if (user.otp == otp) {
      await userModel.create(data)
      await optverify.deleteMany({ email })
      return NextResponse.json({ message: 'user created', success: true})
    }
  } catch (error) {
    return NextResponse.json({message: error.message || 'something went wrong', success: false})
  }
}
