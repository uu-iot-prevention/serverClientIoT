const { Schema, model } = require("mongoose");

const Role = new Schema({
  value: {
    type: String,
    unique: true,
    enum: ["USER", "ADMIN", "STATION"],
    required: true,
    default: "USER",
  },
});

module.exports = model("Role", Role);
