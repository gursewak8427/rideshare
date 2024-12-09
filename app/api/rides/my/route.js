import { NextResponse } from "next/server";
// import { addride, getrides } from "../../../backend/services/rides";
// import { deleteallrides } from "../../../backend/services/rides";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../../backend/config/db.config";
import ridesModel from "../../../../backend/models/rides";

// Driver will get bookings list
export const GET = async (req) => {
  await connectdb();

  const cookieStore = await cookies();

  const decodedToken = jwt.verify(
    cookieStore?._parsed.get("rider-secret").value,
    process?.env?.SECRET_KEY
  );

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid Token", success: false });
  }

  const { userId } = decodedToken;

  let rides = await ridesModel
    .find({ userid: userId })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({
    success: true,
    message: "Bookings find successfully",
    details: rides,
  });
};
