import ridesModel from "../models/rides";
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
    await ridesModel.deleteMany({});
  } catch (error) {
    throw error;
  }
};
export const getRideDetails = async (_id) => {
  try {
    const ride = await ridesModel.findOne({ _id });
    return ride;
  } catch (error) {
    throw error;
  }
};
