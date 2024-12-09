import { NextResponse } from "next/server";
// import { addride, getrides } from "../../../backend/services/rides";
// import { deleteallrides } from "../../../backend/services/rides";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../../../backend/config/db.config";
import bookingsModel from "../../../../../backend/models/bookings";
import mongoose from "mongoose";

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
  console.log({ userId })

  let bookings = await bookingsModel.aggregate([
    {
      $match: { userid: new mongoose.Types.ObjectId(userId) } // Match bookings by userId
    },
    {
      $lookup: {
        from: "rides", // Name of the rides collection
        localField: "rideid", // Field in bookingsModel that references rideId
        foreignField: "_id", // Field in rides collection to match
        as: "rideDetails", // Alias for ride data
      }
    },
    {
      $unwind: "$rideDetails" // Unwind the rideDetails array to make it a single object
    },
    {
      $lookup: {
        from: "riders", // Name of the riders collection
        localField: "rideDetails.userid", // Field in rideDetails to match with rider's userId
        foreignField: "userid", // Field in riders collection to match
        as: "riderDetails", // Alias for rider data
      }
    },
    {
      $unwind: "$riderDetails" // Unwind riderDetails array to make it a single object
    },
    {
      $sort: { createdAt: -1 } // Sort the bookings by creation date
    }
  ]);

  //  here rideid contain, userid and userid is map with rider table, rider table has all details of rider

  return NextResponse.json({
    success: true,
    message: "Bookings find successfully",
    details: bookings,
  });
};


export const POST = async (req) => {
  await connectdb();

  const body = await req?.json();
  const { bookingid } = body;

  const cookieStore = await cookies();

  const decodedToken = jwt.verify(
    cookieStore?._parsed.get("rider-secret").value,
    process?.env?.SECRET_KEY
  );

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid Token", success: false });
  }

  const { userId } = decodedToken;
  console.log({ userId })

  let bookings = await bookingsModel.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(bookingid) } // Match bookings by userId
    },
    {
      $lookup: {
        from: "rides", // Name of the rides collection
        localField: "rideid", // Field in bookingsModel that references rideId
        foreignField: "_id", // Field in rides collection to match
        as: "rideDetails", // Alias for ride data
      }
    },
    {
      $unwind: "$rideDetails" // Unwind the rideDetails array to make it a single object
    },
    {
      $lookup: {
        from: "riders", // Name of the riders collection
        localField: "rideDetails.userid", // Field in rideDetails to match with rider's userId
        foreignField: "userid", // Field in riders collection to match
        as: "riderDetails", // Alias for rider data
      }
    },
    {
      $unwind: "$riderDetails" // Unwind riderDetails array to make it a single object
    },
    {
      $sort: { createdAt: -1 } // Sort the bookings by creation date
    }
  ]);

  //  here rideid contain, userid and userid is map with rider table, rider table has all details of rider

  return NextResponse.json({
    success: true,
    message: "Bookings find successfully",
    details: bookings?.[0] || null,
  });
};
