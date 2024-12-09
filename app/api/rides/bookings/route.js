import { NextResponse } from "next/server";
// import { addride, getrides } from "../../../backend/services/rides";
// import { deleteallrides } from "../../../backend/services/rides";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../../backend/config/db.config";
import bookingsModel from "../../../../backend/models/bookings";

//  On click book button
export const POST = async (req) => {
  await connectdb();
  let body = await req.json();

  const { rideid } = body;

  const cookieStore = await cookies();

  const decodedToken = jwt.verify(
    cookieStore?._parsed.get("rider-secret").value,
    process?.env?.SECRET_KEY
  );

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid Token", success: false });
  }

  const { userId } = decodedToken;

  console.log({ userId, rideid });
  const existingRide = await bookingsModel.findOne({
    userid: userId,
    rideid: rideid,
  });

  console.log(existingRide);

  if (existingRide && existingRide?.status !== "CANCEL") {
    return NextResponse.json({
      success: false,
      message: "You already book a same ride",
    });
  }

  let bookingDetails = await bookingsModel.create({
    userid: userId,
    rideid: rideid,
  });

  return NextResponse.json({
    success: true,
    message: "Booking successfull",
    details: bookingDetails,
  });
};

// Driver will get bookings list
// export const GET = async (req) => {
//   await connectdb();
//   let body = await req.json();

//   const { rideid } = body;

//   const cookieStore = await cookies();

//   const decodedToken = jwt.verify(
//     cookieStore?._parsed.get("rider-secret").value,
//     process?.env?.SECRET_KEY
//   );

//   if (!decodedToken) {
//     return NextResponse.json({ message: "Invalid Token", success: false });
//   }

//   let bookings = await bookingsModel.find({ rideid }).lean();

//   return NextResponse.json({
//     success: true,
//     message: "Bookings find successfully",
//     details: bookings,
//   });
// };

// Driver will update bookings
export const PATCH = async (req) => {
  await connectdb();
  let body = await req.json();

  const { bookingid, status } = body;

  const cookieStore = await cookies();

  const decodedToken = jwt.verify(
    cookieStore?._parsed.get("rider-secret").value,
    process?.env?.SECRET_KEY
  );

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid Token", success: false });
  }

  if (!["PENDING", "ACCEPTED", "REJECTED", "CANCEL"]?.includes(status))
    return NextResponse.json({ message: "Invalid Status", success: false });

  await bookingsModel.findByIdAndUpdate(bookingid, { status });

  return NextResponse.json({
    success: true,
    message: "Booking update successfull",
  });
};
