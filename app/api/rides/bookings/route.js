import { NextResponse } from "next/server";
// import { addride, getrides } from "../../../backend/services/rides";
// import { deleteallrides } from "../../../backend/services/rides";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectdb from "../../../../backend/config/db.config";
import bookingsModel from "../../../../backend/models/bookings";
import ridesModel from "../../../../backend/models/rides";
import usersModel from "../../../../backend/models/users";
import { sendEmail } from "../../../../lib/email";
import { checkIsCancelValid } from "@/lib/utils";

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

  let user = await usersModel.findById(userId);

  if (!user) {
    return NextResponse.json({
      success: false,
      message: "User not found",
    });
  }

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

  sendEmail({
    email: user?.email,
    subject: "You got a new Ride Booking",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Booking Notification</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #007bff;">
                <img src="${process?.env?.NEXT_PUBLIC_SERVER_URL}/logo.png" alt="Company Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #333333;">New Booking Alert!</h1>
                <p style="color: #666666;">Hello,</p>
                <p style="color: #666666;">You have received a new booking. Please check your schedule and prepare for the upcoming ride.</p>
                <p style="color: #666666;">To view all your bookings and get more details, click the button below:</p>
                <p style="text-align: center;">
                    <a href="${process?.env?.NEXT_PUBLIC_SERVER_URL}/myrides/${rideid}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">Check All Bookings</a>
                </p>
                <p style="color: #666666;">If you have any questions or concerns, please don't hesitate to contact our support team.</p>
                <p style="color: #666666;">Thank you for your service!</p>
                <p style="color: #666666;">Best regards,<br>Your Dispatch Team</p>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8f8f8; color: #888888;">
                <p>
                  &copy; {new Date().getFullYear()} Baba Deep Singh Ji Sanstar Sewa Dal. All Rights Reserved.
                </p>
                <p>Email: support@ridesewa.ca</p>
            </td>
        </tr>
    </table>
</body>
</html>`,
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

  const { bookingid, rideid, status } = body;

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

  if (status == "CANCEL") {
    const rideDetails = await ridesModel.findById(rideid);

    if (!rideDetails) {
      return NextResponse.json({ message: "Invalid Ride Id", success: false });
    }

    console.log({ rideDetails });

    if (!checkIsCancelValid(rideDetails?.datetime)) {
      return NextResponse.json({
        message: "You can only cancel the ride, before 1 hour of running",
        success: false,
      });
    }
  }

  let bookingDetails = await bookingsModel.findByIdAndUpdate(bookingid, {
    status,
  });

  if (status == "ACCEPTED") {
    let ridedetails = await ridesModel.findById(bookingDetails.rideid);
    ridedetails.seats = ridedetails.seats - 1;
    if (ridedetails?.seats === 0) {
      ridedetails.status = "STOPPED";
    }

    await ridedetails.save();
  }

  let user = await usersModel.findById(bookingDetails?.userid);

  sendEmail({
    email: user?.email,
    subject: "Booking Status Update",
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Booking Status Update</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0; padding: 0; background-color: #f4f4f4;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #007bff;">
                <img src="${
                  process?.env?.NEXT_PUBLIC_SERVER_URL
                }/logo.png" alt="Company Logo" style="max-width: 150px;">
            </td>
        </tr>
        <tr>
            <td style="padding: 20px;">
                <h1 style="color: #333333;">Booking Status Update</h1>
                <p style="color: #666666;">Dear User,</p>
                <p style="color: #666666;">We're writing to inform you that the status of your booking has been updated.</p>
                
                ${
                  status == "ACCEPTED"
                    ? `<div style="background-color: #d4edda; border: 1px solid #c3e6cb; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
                    <h2 style="color: #155724; margin-top: 0;" > Current Status: Accepted</h2>
                <p style="color: #155724; margin-bottom: 0;">Great news! Your booking has been accepted by the driver. They will arrive at the scheduled time and location.</p>
                </div> `
                    : status == "REJECTED" &&
                      `<div style="background-color: #f8d7da; border: 1px solid #f5c6cb; border-radius: 5px; padding: 15px; margin-bottom: 20px;">
                    <h2 style="color: #721c24; margin-top: 0;">Current Status: Rejected</h2>
                    <p style="color: #721c24; margin-bottom: 0;">We regret to inform you that your booking has been rejected by the driver. This could be due to unforeseen circumstances or scheduling conflicts.</p>
                </div>`
                }
                <p style="color: #666666;">To view the details of your booking or make any changes, please click the button below:</p>
                <p style="text-align: center;">
                    <a href="${
                      process?.env?.NEXT_PUBLIC_SERVER_URL
                    }/mybookings/${bookingid}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px;">View Booking Details</a>
                </p>
                <p style="color: #666666;">If you have any questions or need further assistance, please don't hesitate to contact our customer support team.</p>
                <p style="color: #666666;">Thank you for choosing our service!</p>
                <p style="color: #666666;">Best regards,<br>Your Booking Team</p>
            </td >
        </tr>
        <tr>
          <td style="padding: 20px; text-align: center; background-color: #f8f8f8; color: #888888;">
              <p>
                &copy; {new Date().getFullYear()} Baba Deep Singh Ji Sanstar Sewa Dal. All Rights Reserved.
              </p>
              <p>Email: support@ridesewa.ca</p>
          </td>
        </tr>
    </table >
</body >
</html > `,
  });

  return NextResponse.json({
    success: true,
    message: "Booking update successfull",
  });
};
