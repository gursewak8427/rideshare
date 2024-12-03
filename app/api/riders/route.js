import { NextResponse } from "next/server";
import Rider from "../../../backend/models/rider";
import { verifyToken } from "../../../backend/middleware/verify";
import { cookies, headers } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../backend/config/db.config";

export const POST = async (req) => {
  try {
    await connectdb();

    const riderInfo = await req.json();
    const cookieStore = await cookies();

    const decodedTOken = jwt.verify(
      cookieStore?._parsed.get("rider-secret").value,
      process?.env?.SECRET_KEY
    );

    if (!decodedTOken) {
      return "Invalid";
    }

    const { userId } = decodedTOken;

    console.log({ decodedTOken });

    riderInfo["userid"] = userId;
    console.log({ riderInfo });
    const rider = new Rider(riderInfo);

    await rider.save();

    return NextResponse.json({
      message: "rider info saved",
      success: true,
      details: rider,
    });
    // return NextResponse.json({
    //   message: "saved",
    // });
  } catch (error) {
    console.log(error);
  }
};
