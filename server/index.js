const express = require("express");
PORT = process.env.PORT || 5003;
PORTWS = process.env.PORTWS || 5000;
const mongoose = require("mongoose");
const authRouter = require("./router/authRouter");
const app = express();
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const Dao =
  "mongodb+srv://admin:132435Andrej@cluster0.hqfl9.mongodb.net/auth_roles?retryWrites=true&w=majority";

app.use(cors());
app.use(express.json());
app.use("/auth", authRouter);

wss.on("connection", (ws) => {
  const interval = setInterval(() => {
    const message = "Toto je pravidelná zpráva každou vteřinu";
    ws.send(message);
  }, 3000);
  // Přijatá zpráva od klienta
  ws.on("message", (message) => {
    console.log(`Přijato: ${message}`);

    // Odeslání zprávy zpět klientovi
    ws.send(`Odpověď na: ${message}`);
  });
});

const startWs = () => {
  try {
    server.listen(PORTWS, () => {
      console.log(`Server běží na portu ${PORTWS}`);
    });
  } catch (error) {
    console.log(error);
  }
};
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
startWs();
