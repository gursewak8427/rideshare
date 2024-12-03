import { NextResponse } from "next/server";
import User from "../../../../backend/models/users";
import connectdb from "../../../../backend/config/db.config";

export const POST = async(req) => {
  try {
    await connectdb();
    const userInfo = await req.json();  // Await for the request body to be parsed
    console.log(userInfo);

    // Check if the user already exists
    const user = await User.findOne({ email: userInfo.email });
    if (user) {
      return NextResponse.json(
        { message: "User already exists", success: false },
        { status: 409 }  // Conflict status code
      );
    }

    // Create a new user
    const newUser = new User(userInfo);
    await newUser.save();

    return NextResponse.json(
      { message: "User registered successfully", success: true },
      { status: 201 }  // Created status code
    );
  } catch (error) {
    console.error("Error during user registration:", error);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }  // Internal server error status code
    );
  }
};
