import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../backend/config/db.config";

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

    const { role } = decodedToken;
    if (!role || role != "admin") {
      return NextResponse.json(
        { message: "Unauthorized: Invalid user ID in token", success: false },
        { status: 401 }
      );
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {}
};
