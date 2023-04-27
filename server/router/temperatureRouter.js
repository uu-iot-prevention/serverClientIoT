const Router = require("express");
const router = new Router();
const ControllerCls = require("../controller/temperatureController");
const controller = new ControllerCls();

router.get("/temperature", controller.getTemperature);

module.exports = router;