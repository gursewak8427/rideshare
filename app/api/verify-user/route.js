import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../backend/config/db.config";
import User from "../../../backend/models/users"; // Assuming you have a User model

export const GET = async (req) => {
  try {
    await connectdb();

    const cookieStore = cookies(); // No need for await here
    const token = await cookieStore.get("rider-secret")?.value;

    console.log({ token });

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided", success: false },
        { status: 401 }
      );
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid token", success: false },
        { status: 401 }
      );
    }

    const { userId } = decodedToken;

    const user = await User.findById(userId);
    if (!user || !user.status) {
      return NextResponse.json(
        { message: "Unauthorized: User is not active", success: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", success: false },
      { status: 500 }
    );
  }
};
