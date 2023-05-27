const User = require("../models/User");
const userValidation = require("../validation/userValidation");

class usersController {
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);c
    }
  }
  async deleteUser(req, res) {
    try {
      const userId = req.params.id;

      await User.findByIdAndRemove(userId)
        .then((removedUser) => {
          if (removedUser) {
            res
              .status(200)
              .json({ message: "Uživatel byl odstraněn", user: removedUser });
          } else {
            res.status(404).json({ message: "Uživatel nebyl nalezen" });
          }
        })
        .catch((error) => {
          res.status(500).json({
            message: "Chyba při odstraňování uživatele",
            error: error,
          });
        });
    } catch (error) {
      console.log(error);
    }
  }
  async updateUser(req, res) {
    try {
      const { error, value } = userValidation.updateSchema.validate(req.body);

      if (error) {
        // Vstupní data nesplňují požadavky schématu
        console.log(error.message);
        return res.status(404).json({ message: error.message });
      }

      const userId = req.params.id;
      const updatedUserData = req.body; // Předpokládá se, že aktualizovaná data uživatele jsou součástí požadavku v těle (req.body)

      await User.findByIdAndUpdate(userId, updatedUserData, { new: true })
        .then((updatedUser) => {
          if (updatedUser) {
            res.status(200).json({
              message: "Uživatel byl aktualizován",
              user: updatedUser,
            });
          } else {
            res.status(404).json({ message: "Uživatel nebyl nalezen" });
          }
        })
        .catch((error) => {
          res
            .status(500)
            .json({ message: "Chyba při aktualizaci uživatele", error: error });
        });
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new usersController();
