const express = require("express");
PORT = process.env.PORT || 5003;
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter");
const app = express();
const cors = require("cors");
const Dao =
  "mongodb+srv://admin:132435Andrej@cluster0.hqfl9.mongodb.net/auth_roles?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

const start = async () => {
  try {
    await mongoose.connect(Dao, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    });
    app.listen(PORT, () => {
      console.log(`Server started on port : ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
