const {Schema, model} = require("mongoose");

const temperatureSchema = new Schema({
    recordDate: {type: String, required: true},
    recordValue: {type: Number, required: true}
});
module.exports = model("temperature", temperatureSchema);