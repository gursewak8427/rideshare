const mongoose = require("mongoose");
const userSchemea = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const users = mongoose.models.users || mongoose.model("users", userSchemea);

module.exports = users;
