const Router = require("express");
const router = new Router();
const controller = require("../controller/stationController");
const roleMiddleware = require("../middleware/roleMiddleware");

router.post("/registration", controller.registration);
router.post("/login", controller.login);
router.post(
  "/temperature-post/",
  roleMiddleware(["STATION"]),
  controller.postTemperature
);
router.post("/alert-post/", roleMiddleware(["STATION"]), controller.postAlert);
router.get("/stationList", controller.listStations);
router.get("/temperature", controller.getTempByDay);
router.get("/alert-get", controller.getAllert);

module.exports = router;
