import ridesModel from "../models/rides";
import riderModel from "../models/rider";
import connectdb from "../config/db.config";

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

    // profile
    const profile = await riderModel.findOne({ userid: ride?.userid }).lean();

    return { ...ride, ...profile };
  } catch (error) {
    throw error;
  }
};
