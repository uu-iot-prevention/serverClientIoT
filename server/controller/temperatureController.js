const model = require("../models/Temperature");

class TemperatureController {
     async getTemperature(req, res) {
        try {
            const body = req.body;
            if (!body) {
                new Error("Body does not exist")
            }
            const date = body.date;
            if (!date || !date instanceof Date) {
                new Error("Date does not exist");
            }
            const record = await model.find({recordDate: date}).exec();
            if (!record) {
                new Error("record does not exist");
            }
            res.json(record);
        } catch (e) {
            res.status(400).send(e);
        }
    }
}
module.exports = TemperatureController;