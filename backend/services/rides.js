import ridesModel from "../models/rides";
import riderModel from "../models/rider";
import userModel from "../models/users";
import bookingModel from "../models/bookings";
import connectdb from "../config/db.config";
import axios from "axios";
import bookings from "../models/bookings";

export const getrides = async () => {
  try {
    await connectdb();
    const rides = await ridesModel.find({});
    return rides;
  } catch (error) {
    throw error;
  }
};

export const addride = async (data) => {
  try {
    await connectdb();
    const newride = await ridesModel.create(data);
    return newride;
  } catch (error) {
    throw error;
  }
};
export const deleteallrides = async () => {
  try {
    await connectdb();
    await ridesModel.deleteMany({});
  } catch (error) {
    throw error;
  }
};

export const getRideDetails = async (_id) => {
  try {
    await connectdb();

    const ride = await ridesModel.findOne({ _id }).populate("userid").lean();

    if (!ride) {
      throw new Error("Ride not found");
    }

    const profile = await riderModel.findOne({ userid: ride.userid }).lean();

    const bookingsList = await bookings.find({ rideid: _id }).lean();

    const bookingListWithProfiles = await Promise.all(
      bookingsList.map(async (booking) => {
        const userprofile = await riderModel
          .findOne({ userid: booking.userid })
          .lean();
        return {
          bookingId: booking?._id,
          ...booking,
          ...userprofile,
        };
      })
    );

    return {
      rideId: _id,
      profileId: profile?._id,
      ...ride,
      ...profile,
      bookings: bookingListWithProfiles,
    };
  } catch (error) {
    throw error;
  }
};

export const getRideDetailsUser = async (_id) => {
  try {
    await connectdb();

    const ride = await ridesModel.findOne({ _id }).populate("userid").lean();

    if (!ride) {
      throw new Error("Ride not found");
    }

    const profile = await riderModel.findOne({ userid: ride.userid }).lean();

    return {
      ...ride,
      ...profile,
    };
  } catch (error) {
    throw error;
  }
};
