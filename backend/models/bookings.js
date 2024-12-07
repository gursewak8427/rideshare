const mongoose = require("mongoose");

const bookingsSchema = new mongoose.Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    rideid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Rides",
    },
    status: {
      type: String,
      enum: ["PENDING", "ACCEPTED", "REJECTED", "CANCEL"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

// Check if the model already exists
export default mongoose.models.Bookings ||
  mongoose.model("Bookings", bookingsSchema);
