import { NextResponse } from "next/server";
import User from "../../../../backend/models/users";
const jwt = require("jsonwebtoken");
import connectdb from "../../../../backend/config/db.config";
export const POST = async (req) => {
  try {
    await connectdb();
    const { email, password } = await req.json();

    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({
        message: "Email Not Registered!",
        success: false,
      });
    }

    if (user.password != password) {
      return NextResponse.json({
        message: "Password is wrong",
        success: false,
      });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.SECRET_KEY,
      {
        expiresIn: "2d",
      }
    );

    const res = NextResponse.json({
      message: "Login successfull",
      success: true,
      data: {
        user,
      },
    });

    res.cookies.set("rider-secret", token, {
      // httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24,
    });

    return res;
  } catch (error) {
    return NextResponse.json({
      message: error.message || "something went wrong",
      success: false,
    });
  }
};
