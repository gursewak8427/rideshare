import { NextResponse } from "next/server";
import User from "../../../../backend/models/users";
import connectdb from "../../../../backend/config/db.config";
export const POST = async(req) => {
    try {
      await connectdb();
      const userInfo = await req.json();  // Await for the request body to be parsed
     
      // Check if the user already exists
      const user = await User.findOneAndUpdate({ email: userInfo.email },{password:userInfo.password});
      // Create a new user
    //   const newUser = new User(userInfo);
      await user.save();
        console.log({user,message:"password changes successfully"})
      return NextResponse.json(
        { message: "Password change successfully", success: true },
        { status: 200 }  // Created status code
      );
    } catch (error) {
      console.error("Error during changing password", error);
      return NextResponse.json(
        { message: "Internal server error", success: false },
        { status: 500 }  // Internal server error status code
      );
    }
  };
  