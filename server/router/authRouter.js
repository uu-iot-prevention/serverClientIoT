const Router = require("express");
const router = new Router();
const controller = require("../controller/authController");
const { check } = require("express-validator");
const authMiddleware = require("../middlewaree/authMiddleware");
const roleMiddleware = require("../middlewaree/roleMiddleware");

router.post(
  "/registration",
  check("username", "user name can not to be empty").notEmpty(),
  check("surname", "user name can not to be empty").notEmpty(),
  check("email", "user name can not to be empty").notEmpty(),
  check("password", "must be between 4 and 10 symbols").isLength({
    min: 4,
    max: 10,
  }),
  controller.registration
);
router.post("/login", controller.login);
router.get(
  "/users",
  authMiddleware,
  roleMiddleware(["USER"]),
  controller.getUser
);

module.exports = router;
