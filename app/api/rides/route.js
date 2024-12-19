import { NextResponse } from "next/server";
import { addride, getrides } from "../../../backend/services/rides";
import { deleteallrides } from "../../../backend/services/rides";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import ridesModel from "../../../backend/models/rides";
import connectdb from "../../../backend/config/db.config";

export const POST = async (req) => {
  await connectdb();
  let body = await req.json();
  const cookieStore = await cookies();

  const decodedToken = jwt.verify(
    cookieStore?._parsed.get("rider-secret").value,
    process?.env?.SECRET_KEY
  );

  if (!decodedToken) {
    return NextResponse.json({ message: "Invalid Token", success: false });
  }

  const { userId } = decodedToken;
  body["userid"] = userId;

  console.log({ body });

  const { latitude, longitude } = body;

  delete body.latitude;
  delete body.longitude;

  const newride = await addride({
    ...body,
    coordinates: { type: "Point", coordinates: [longitude, latitude] },
  });
  return NextResponse.json(newride);
};

export const GET = async (req) => {
  await connectdb();
  const searchParams = req.nextUrl.searchParams;
  const routetype = searchParams.get("routetype");
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("long");
  const radius = 5000;

  console.log(new Date(), "--current date time on server");

  const rides = await ridesModel.aggregate([
    {
      $match: {
        routetype,
        status: "ACTIVE",
        datetime: { $gt: new Date() }, // Match only future rides (use Date object)
        seats: { $gt: 1 }, // Match only rides with more than 1 seat
        ...(latitude &&
          longitude && {
            coordinates: {
              $geoWithin: {
                $centerSphere: [
                  [parseFloat(longitude), parseFloat(latitude)],
                  radius / 6378100,
                ], // Radius in radians
              },
            },
          }),
      }, // Match the routetype
    },
    {
      $lookup: {
        from: "riders", // Name of the riders collection
        localField: "userid", // Field in the rides model
        foreignField: "userid", // Field in the riders model
        as: "riderDetails", // Output array containing matched riders
      },
    },
    {
      $unwind: {
        path: "$riderDetails", // Unwind the array to merge rider details into the ride document
        preserveNullAndEmptyArrays: true, // Optional: if you want to preserve rides with no matching rider
      },
    },
  ]);

  return NextResponse.json({
    message: "Ride Find",
    success: true,
    details: rides,
  });
};

export const PATCH = async (req) => {
  await connectdb();

  const body = await req?.json();
  const { id, data } = body;

  console.log({ body });

  if (!id) {
    return NextResponse.json({
      message: "Id is required",
      success: false,
    });
  }

  await ridesModel.findByIdAndUpdate(id, data);

  return NextResponse.json({
    message: "Ride Update Successfully",
    success: true,
  });
};

export const DELETE = async (req) => {
  await deleteallrides();
  return NextResponse.json({ message: "deleted" });
};
