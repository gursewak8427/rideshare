import { NextResponse } from "next/server";
import Rider from "../../../backend/models/rider";
import { verifyToken } from "../../../backend/middleware/verify";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../backend/config/db.config";

export const POST = async (req) => {
  try {
    // Establish database connection
    await connectdb();

    // Parse incoming request data
    const riderInfo = await req.json();
    const cookieStore = cookies();

    // Retrieve token securely
    const token = cookieStore?.get("rider-secret")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized: No token provided", success: false },
        { status: 401 }
      );
    }

    // Verify JWT token
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
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid user ID in token", success: false },
        { status: 401 }
      );
    }

    // Attach userId to riderInfo
    riderInfo["userid"] = userId;

    // Update or create rider profile in one query
    const updatedRider = await Rider.findOneAndUpdate(
      { userid: userId }, // Find by userId
      { $set: riderInfo }, // Update with new info
      { new: true, upsert: true } // Return updated doc, create if not exists
    );

    return NextResponse.json({
      message: updatedRider.wasNew
        ? "Rider profile created"
        : "Rider profile updated",
      success: true,
      details: updatedRider,
    });
  } catch (error) {
    console.error("Error handling rider profile:", error);

    return NextResponse.json(
      {
        message: "An error occurred while processing the request",
        success: false,
      },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    await connectdb();

    const cookieStore = cookies(); // No need for await here
    const token = cookieStore.get("rider-secret")?.value;

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
    if (!userId) {
      return NextResponse.json(
        { message: "Unauthorized: Invalid user ID in token", success: false },
        { status: 401 }
      );
    }

    let rider = await Rider.findOne({ userid: userId });

    if (!rider) {
      return NextResponse.json({
        message: "Rider not found",
        success: false,
      });
    }

    // Clean the rider object if needed (e.g., delete sensitive fields)
    const { _id, ...riderData } = rider.toObject();

    return NextResponse.json({
      message: "Rider info fetched successfully",
      success: true,
      details: riderData,
    });
  } catch (error) {
    console.error("Error fetching rider info:", error);

    return NextResponse.json(
      {
        message: "An error occurred while processing the request",
        success: false,
      },
      { status: 500 }
    );
  }
};
