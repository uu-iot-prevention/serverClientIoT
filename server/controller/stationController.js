const Station = require("../models/Station");
const stationSchema = require("../validation/stationValidation");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const generateAccessToken = (id, idStation, roles) => {
  const payload = {
    id,
    idStation,
    roles,
  };
  return jwt.sign(payload, secret, { expiresIn: "30m" });
};
class stationController {
  async registration(req, res) {
    try {
      const { error, value } = stationSchema.stationSchemaRegistrate.validate(
        req.body
      );

      if (error) {
        // Vstupní data nesplňují požadavky schématu
        console.log(error.message);
        return res.status(404).json({ message: error.message });
      }

      const { idStation, stationName, roles, dataTemperature, stationAlert } =
        value;
      const candidate = await Station.findOne({ idStation });
      if (candidate) {
        return res.status(400).json({ message: "Station already exist" });
      }

      const station = new Station({
        idStation,
        stationName,
        roles,
        dataTemperature,
        stationAlert,
      });

      await station.save();
      return res.json({ message: "Station registration was success", station });
    } catch (error) {
      console.log(error);
      res.status(404), json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { error, value } = stationSchema.stationSchemaLogin.validate(
        req.body
      );

      if (error) {
        // Vstupní data nesplňují požadavky schématu
        console.log(error.message);
        return res.status(404).json({ message: error.message });
      }

      const { idStation, roles } = value;

      const station = await Station.findOne({ idStation });

      if (!station) {
        return res
          .status(404)
          .json({ message: `station ${idStation} not found` });
      }

      const token = generateAccessToken(
        station._id,
        station.idStation,
        station.roles
      );

      return res.json({ token, station });
    } catch (error) {
      console.log(error);
      res.status(404), json({ message: "Login error" });
    }
  }
}

module.exports = new stationController();
