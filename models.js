const mongoose = require("mongoose");

const userSchemaRedis = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  mobile: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("User", userSchemaRedis);
