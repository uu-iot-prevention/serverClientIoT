const { Schema, model, default: mongoose } = require("mongoose");

const Station = new Schema({
  idStation: { type: String, unique: true, required: true },
  stationName: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  dataTemperature: [
    {
      _id: false,
      time: { type: Date, default: Date.now },
      value: { type: String, required: true },
    },
  ],
  stationAlert: [
    {
      time: { type: Date, default: Date.now },
      message: { type: String, required: true },
      type: {
        type: [String],
        enum: ["SOS", "FIRE", "FIREWARNING"],
        required: true,
      },
    },
  ],
});

module.exports = model("Station", Station);
