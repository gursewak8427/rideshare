const mongoose = require("mongoose");
const userSchemea = new mongoose.Schema(
  {
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);
const users = mongoose.models.users || mongoose.model("users", userSchemea);

module.exports = users;
