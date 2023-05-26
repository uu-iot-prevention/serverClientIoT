const User = require("../models/User");
const Role = require("../models/Role");
const { json } = require("express/lib/response");
const bcrypt = require("bcryptjs");
const timeHelper = require("../helpers/timeHelpers");
const jwt = require("jsonwebtoken");
const { secret } = require("../config/config");
const registrateSchema = require("../validation/registrateValidation");
const loginSchema = require("../validation/loginValidation");

const generateAccessToken = (id, username, email, roles) => {
  const expiresInMinutes = 30; // Doba platnosti tokenu v minutách
  const expTime = timeHelper.addMinutesToCurrentDate(expiresInMinutes);
  const payload = {
    id,
    username,
    email,
    roles,
  };
  // console.log(expTime);
  return {
    token: jwt.sign(payload, secret, { expiresIn: expiresInMinutes * 60 }),
    exp: expTime,
  };
};

class authController {
  async registration(req, res) {
    try {
      const { error, value } = registrateSchema.validate(req.body);

      if (error) {
        // Vstupní data nesplňují požadavky schématu
        console.log(error.message);
        return res.status(404).json({ message: error.message });
      }

      const { username, surname, email, password } = value;
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

      console.log(user);
      await user.save();
      return res.json({ message: "Users registration was success", user });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: "Registration error" });
    }
  }
  async login(req, res) {
    try {
      const { error, value } = loginSchema.validate(req.body);

      if (error) {
        // Vstupní data nesplňují požadavky schématu
        console.log(error.message);
        return res.status(404).json({ message: error.message });
      }

      const { email, password } = value;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: `user ${email} not found` });
      }
      const validPassword = bcrypt.compareSync(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ message: "wrong password" });
      }
      const token = generateAccessToken(
        user._id,
        user.username,
        user.email,
        user.roles
      );

      const user1 = {
        username: user.username,
        email: user.email,
        surname: user.surname,
        roles: user.roles,
      };

      return res.json({
        token: token.token,
        exp: token.exp,
        user: { ...user1 },
      });
    } catch (error) {
      console.log(error);
      res.status(404), json({ message: "Login error" });
    }
  }
}

module.exports = new authController();
