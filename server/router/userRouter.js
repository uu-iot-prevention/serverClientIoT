const Router = require("express");
const router = new Router();
const controller = require("../controller/usersController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.get("/", authMiddleware, roleMiddleware(["ADMIN"]), controller.getUser);
router.post(
  "/user-update/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  controller.updateUser
);
router.post(
  "/user-delete/:id",
  authMiddleware,
  roleMiddleware(["ADMIN"]),
  controller.deleteUser
);

module.exports = router;
