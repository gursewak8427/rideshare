import { NextResponse } from 'next/server'

const optverify = require('../../../../backend/models/email-verify')
const userModel = require('../../../../backend/models/users')
import connectdb from "../../../../backend/config/db.config";

export const POST = async req => {
  try {
    await connectdb()
    const data = await req.json()

    console.log(data)

    if (!data.email || !data.otp) {
      return NextResponse.json({ message: 'fields are required to verify otp', success: false })
    }

    const user = await optverify
      .findOne({ email: data?.email })
      .sort({ createdAt: -1 })
      .limit(1)
      .lean()

    console.log(user)

    if (!user) {
      return NextResponse.json({ message: 'no such user found', success: false })
    }

    if (user.expiredAt <= Date.now()) {
      return NextResponse.json({ message: 'otp has expired', success: false })
    }

    if (user?.otp == data?.otp) {
      
      await optverify.deleteMany({ email: data?.email })
      return NextResponse.json({ message: 'user created', success: true, user})
     
    }
  } catch (error) {
    return NextResponse.json({message: error.message || 'something went wrong', success: false})
  }
}
