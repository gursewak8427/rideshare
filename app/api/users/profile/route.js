import connectdb from "../../../../backend/config/db.config";
import jwt from "jsonwebtoken";
import { cookies, headers } from "next/headers";

import users from "../../../../backend/models/users";
import { NextResponse } from "next/server";
import riders from "@/backend/models/rider";

export const GET = async (req) => {
  try {
    await connectdb();

    const cookieStore = cookies(); // No need for await here
    const token = await cookieStore.get("rider-secret")?.value;

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
        { message: "Unauthorized: Invalid token" },
        { status: 401 }
      );
    }

    const { userId } = decodedToken;
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid user ID in token" },
        { status: 401 }
      );
    }

    let user = await users.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        {
          message: "user not found",
        },
        { status: 401 }
      );
    }

    const profile = await riders?.findOne({ userid: userId }).lean();

    if (
      !profile ||
      !Boolean(profile?.phoneNumber) ||
      !Boolean(profile?.username)
    ) {
      return NextResponse.json(
        {
          message: "user profile not found",
          success: false,
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "user info fetched successfully",
      success: true,
      details: profile,
    });
  } catch (error) {
    console.error("Error fetching user info:", error);

    return NextResponse.json(
      {
        message: "An error occurred while processing the request",
        success: false,
      },
      { status: 500 }
    );
  }
};
