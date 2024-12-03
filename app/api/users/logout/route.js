import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    const res = NextResponse.json({
      message: "logout successfull",
      success: true,
    });

    res.cookies.delete("rider-secret");

    return res;
  } catch (error) {
    console.log(error);
  }
};
