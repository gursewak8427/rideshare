const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  status: {
    type: String,
    enum: ["go", "back"],
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  carModel: {
    type: String,
    required: true,
    trim: true,
  },
  carImage: {
    type: String,
    required: true,
    trim: true,
  },
  riderImage: {
    type: String,
    required: true,
    trim: true,
  },
  seats: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model already exists
const Rides = mongoose.models.Rides || mongoose.model("Rides", ridesSchema);

module.exports = Rides;
