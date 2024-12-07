const mongoose = require("mongoose");

const riderSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  userImage: {
    type: String,
  },
  username: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },

  address: {
    type: String,
  },
  city: {
    type: String,
  },
  province: {
    type: String,
  },

  vehicleNumber: {
    type: String,
  },
  vechileImage: {
    type: String,
  },
  vehicleModel: {
    type: String,
  },
});
const riders = mongoose.models.riders || mongoose.model("riders", riderSchema);

module.exports = riders;
