import { NextResponse } from "next/server";

const cloudinary = require("cloudinary").v2;
// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME, // replace with your Cloudinary cloud name
  api_key: process.env.CLOUDINARY_API, // replace with your Cloudinary API key
  api_secret: process.env.CLOUDINARY_APISECRET, // replace with your Cloudinary API secret
});
export async function POST(req) {
  try {
    const body = await req.json();
    console.log(body);
    const fileStr = body.base64;

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "ridesewa",
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error("Error uploading image:", error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
