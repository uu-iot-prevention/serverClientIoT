const Router = require("express");
const router = new Router();
const controller = require("../controller/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const registrateValidation = require("../validation/registrateValidation");
const validator = require("express-joi-validation").createValidator({});
router.post("/registration", controller.registration);
router.post("/login", controller.login);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["USER"]),
  controller.getUser
);

module.exports = router;

// check("username", "user name can not to be empty").notEmpty(),
//   check("surname", "user name can not to be empty").notEmpty(),
//   check("email", "user name can not to be empty").notEmpty(),
//   check("password", "must be between 4 and 10 symbols").isLength({
//     min: 4,
//     max: 10,
//   }),
