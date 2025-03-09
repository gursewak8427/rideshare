import { NextResponse } from "next/server";
import connectdb from "../../../../backend/config/db.config";
import User from "../../../../backend/models/users";
import Rides from "../../../../backend/models/rides";

export async function POST() {
  try {
    await connectdb();

    // Get total users & blocked users count
    const totalUsers = await User.countDocuments();
    const blockedUsers = await User.countDocuments({ status: false });

    // Get ride statistics
    const todaysStart = new Date();
    todaysStart.setHours(0, 0, 0, 0);

    const thisWeekStart = new Date();
    thisWeekStart.setDate(thisWeekStart.getDate() - thisWeekStart.getDay()); // Start of the week
    thisWeekStart.setHours(0, 0, 0, 0);

    const thisMonthStart = new Date();
    thisMonthStart.setDate(1); // Start of the month
    thisMonthStart.setHours(0, 0, 0, 0);

    const todaysRides = await Rides.countDocuments({
      datetime: { $gte: todaysStart },
    });
    const thisWeekRides = await Rides.countDocuments({
      datetime: { $gte: thisWeekStart },
    });
    const thisMonthRides = await Rides.countDocuments({
      datetime: { $gte: thisMonthStart },
    });

    // Get daily ride statistics for the last 7 days
    const dailyRideStats = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);

      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);

      const ridesCount = await Rides.countDocuments({
        datetime: { $gte: date, $lt: nextDay },
      });
      dailyRideStats.push({
        date: date.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        }),
        rides: ridesCount,
      });
    }

    // Response data
    return NextResponse.json({
      success: true,
      data: {
        stats: {
          totalUsers,
          blockedUsers,
          todaysRides,
          thisWeekRides,
          thisMonthRides,
        },
        dailyRideStats,
      },
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
