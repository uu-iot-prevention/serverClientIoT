const Router = require("express");
const router = new Router();
const controller = require("../controller/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", roleMiddleware(["ADMIN"]), controller.getUser);
router.post(
  "/user-update/:id",

  roleMiddleware(["ADMIN"]),
  controller.updateUser
);
router.post(
  "/user-delete/:id",

  roleMiddleware(["ADMIN"]),
  controller.deleteUser
);

module.exports = router;
