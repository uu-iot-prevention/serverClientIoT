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
  async listStations(req, res) {
    try {
      let data = await Station.find();

      const newDatas = data.map((value) => ({
        idStation: value.idStation,
        stationName: value.stationName,
      }));

      res.status(200).json(newDatas);
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  }
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
  async postTemperature(req, res) {
    try {
      const dataTemperature = req.body;
      if (!dataTemperature) {
        res.status(404).json({ message: "data errors" });
      }
      for (let index = 0; index < dataTemperature.length; index++) {
        const element = dataTemperature[index];
        const station = await Station.findOne({
          idStation: element.idStation,
        });
        if (!station) {
          const newStation = {
            idStation: element.idStation,
            stationName: element.idStation,
            roles: ["STATION"],
            dataTemperature: [],
            stationAlert: [],
          };
          const { error, value } =
            stationSchema.stationSchemaRegistrate.validate(newStation);
          if (error) {
            // Vstupní data nesplňují požadavky schématu
            console.log(error.message);
            return res.status(404).json({ message: error.message });
          }

          const {
            idStation,
            stationName,
            roles,
            dataTemperature,
            stationAlert,
          } = value;

          const station = new Station({
            idStation,
            stationName,
            roles,
            dataTemperature,
            stationAlert,
          });
          await station.save();

          const newStationDB = await Station.findOne({
            idStation: element.idStation,
          });
          const data = [
            ...newStationDB?.dataTemperature,
            ...element?.dataTemperature,
          ];
          newStationDB.dataTemperature = data;
          await newStationDB.save();
        } else {
          const data = [
            ...station?.dataTemperature,
            ...element?.dataTemperature,
          ];
          station.dataTemperature = data;
          await station.save();
        }
      }
      res.status(200).json({ message: "data save was success " });
    } catch (error) {
      res.status(404).json({ message: "nefunguje" });
    }
  }
  async postAlert(req, res) {
    try {
      const alertBody = req.body;
      if (!alertBody) {
        res.status(404).json({ message: "data errors" });
      }
      const [token] = useCoe;
      let alert = await Station.findOne({ idStation: alertBody.idStation });
      if (!alert) {
        const newStation = {
          idStation: alertBody.idStation,
          stationName: alertBody.idStation,
          roles: ["STATION"],
          dataTemperature: [],
          stationAlert: [],
        };
        const { error, value } =
          stationSchema.stationSchemaRegistrate.validate(newStation);
        if (error) {
          // Vstupní data nesplňují požadavky schématu
          console.log(error.message);
          return res.status(404).json({ message: error.message });
        }

        const { idStation, stationName, roles, dataTemperature, stationAlert } =
          value;

        const station = new Station({
          idStation,
          stationName,
          roles,
          dataTemperature,
          stationAlert,
        });
        await station.save();
      }
      alert = await Station.findOne({ idStation: alertBody.idStation });
      if (!alert) {
        res.status(404).json({ message: "Station is not found" });
      }
      let messageAlert;
      switch (alertBody.type) {
        case "SOS":
          messageAlert = "Zmacklo se tlacitko SOS";
          break;
        case "FIRE":
          messageAlert = "Hori ";
          break;
        case "FIREWARNING":
          messageAlert = "Varovani o zvysene teplote";
          break;

        default:
          break;
      }
      alertBody.message = messageAlert;

      const dataAlert = [...alert.stationAlert, ...[alertBody]];
      alert.stationAlert = dataAlert;

      await alert.save();

      res.status(200).json({ message: "data save was success ", alertBody });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }
  async getTempByDay(req, res) {
    try {
      let date;
      if (!req.body.date) {
        date = new Date();
      } else {
        date = new Date(req.body.date);
      }
      let record = await Station.findOne({ idStation: req.body.idStation });
      let tempData = record.dataTemperature;
      let out = [];
      for (let t of tempData) {
        let newDate = t.time;
        if (
          date.getDay() === newDate.getDay() &&
          date.getMonth() === newDate.getMonth() &&
          date.getFullYear() === newDate.getFullYear()
        ) {
          out.push(t);
        }
      }
      if (out.length === 0) {
        res.status(400).json("NO DATA");
      }
      else {
        res.json(out);
      }
      
    } catch (e) {
      console.error(e);
      res.status(400).send(e);
    }
  }
  async getAllert(req, res) {
    try {
      let id = req.params.id;
      if (!id) {
        res.status(400).json("Invalid body");
      }
      let record = await Station.find({ idStation: id });
      let alerts = record[0].stationAlert;
      if (!alerts) {
        res.json("NO ALERTS");
      } else {
        res.json(alerts);
      }
    } catch (e) {
      console.error(e);
      res.status(400).json(e);
    }
  }
}

module.exports = new stationController();
