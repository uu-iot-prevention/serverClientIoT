const { Schema, model, default: mongoose } = require("mongoose");

const Station = new Schema({
  idStation: { type: String, unique: true, required: true },
  stationName: { type: String, required: true },
  roles: [{ type: String, ref: "Role" }],
  dataTemperature: [
    {
      time: { type: Date, default: Date.now },
      value: { type: String, required: true },
    },
  ],
  stationAlert: [
    {
      _id: Schema.Types.ObjectId,
      time: { type: Date, default: Date.now },
      message: { type: String, required: true },
      type: { type: [String], enum: ["SOS", "FIRE"], required: true },
    },
  ],
});

module.exports = model("Station", Station);
