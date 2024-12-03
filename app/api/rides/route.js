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

  const newride = await addride(body);
  return NextResponse.json(newride);
};

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

  const ride = await ridesModel.findOne({ userid: userId });

  if (!ride) {
    return NextResponse.json({ message: "Ride Find", success: false });
  }

  return NextResponse.json({
    message: "Ride Find",
    success: true,
    details: ride,
  });
};

export const DELETE = async (req) => {
  await deleteallrides();
  return NextResponse.json({ message: "deleted" });
};
