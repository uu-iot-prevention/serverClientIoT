const User = require("../models/User");
const Role = require("../models/Role");
const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const generateAccessToken = (id, username) => {
  const payload = {
    id,
    username,
  };
  return jwt.sign(payload, secret, { expiresIn: "24h" });
};

class authController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({ message: "Registration error", errors });
      }
      const { username, surname, email, password } = req.body;
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "User already exist" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const userRole = await Role.findOne({ value: "USER" });
      const user = new User({
        surname,
        email,
        username,
        password: hashPassword,
        roles: [userRole.value],
      });

      await user.save();
      return res.json({ message: "Users registration was success", user });
    } catch (error) {
      console.log(error);
      res.status(400), json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: `user ${email} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "wrong password" });
      }
      const token = generateAccessToken(user._id, user.username, user.surname);
      return res.json({ token, user });
    } catch (error) {
      console.log(error);
      res.status(400), json({ message: "Login error" });
    }
  }
  async getUser(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = new authController();
