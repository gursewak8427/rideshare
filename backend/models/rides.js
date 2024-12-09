const mongoose = require("mongoose");

const ridesSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },
  routetype: {
    type: String,
    enum: ["go", "back"],
    required: true,
  },
  location: {
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
  status: {
    type: String,
    enum: ["ACTIVE", "STOPPED", "CLOSED"],
    default: "ACTIVE"
  },
  coordinates: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },
}, { timestamps: true });

// Add GeoJSON index for geospatial queries
ridesSchema.index({ coordinates: "2dsphere" });


// Check if the model already exists
const Rides = mongoose.models.Rides || mongoose.model("Rides", ridesSchema);

module.exports = Rides;
