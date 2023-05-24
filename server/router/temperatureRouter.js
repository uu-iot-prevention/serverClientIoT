const Router = require("express");
const router = new Router();
const ControllerCls = require("../controller/temperatureController");
const controller = new ControllerCls();

router.get("/temperature", controller.getTemperature);
router.get("/temperaturePerDay", controller.getTemperatureByDay);
router.get("/dateList", controller.getDateList);
router.post("/postNewRecord", controller.postNewRecord);

module.exports = router;