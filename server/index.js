const express = require("express");
PORT = process.env.PORT || 5003;
PORTWS = process.env.PORTWS || 5001;

const mongoose = require("mongoose");
const authRouter = require("./router/authRouter");
const stationRouter = require("./router/stationRouter");
const userRouter = require("./router/userRouter");
const app = express();
// let passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
const cors = require("cors");
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
// const session = require("express-session");

const Dao =
  "mongodb+srv://admin:132435Andrej@cluster0.hqfl9.mongodb.net/auth_roles?retryWrites=true&w=majority";

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/station", stationRouter);
// app.use(
//   session({
//     secret: "your-secret-key",
//     resave: false,
//     saveUninitialized: false,
//   })
// );
// #startregion
// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser((user, done) => {
//   // Uložte do relace pouze ID uživatele
//   done(null, user._json.email);
// });

// passport.deserializeUser((email, done) => {
//   // Načtěte uživatele z databáze pomocí ID
//   User.findOne({ email: email }).then(result => {
//     // Manipulace s výsledkem
//     console.log(result);

//       done(err, result);
//     }
//   })
//   .catch(error => {
//     // Zpracování chyby
//     console.error(error);
//   });
// });

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID:
//         "829824178601-mf6744k3vgci91iuf0q68118bd1kj34e.apps.googleusercontent.com",
//       clientSecret: "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",
//       callbackURL: "/auth/google/callback",
//     },
//     async (accessToken, refreshToken, profile, done) => {
//       // const user = {
//       //   id: profile.id,
//       //   name: profile.displayName,
//       //   email: profile.emails[0].value,
//       // };

//       // const user1 = await User.findOne({ email: "krucfalushij@email.cz" });
//       // console.log(user1);
//       // done(null, user1);
//       done(null, profile);
//     }
//   )
// );
// app.get(
//   "/auth/google",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// app.get(
//   "/auth/google/callback",
//   passport.authenticate("google", { failureRedirect: "/login" }),
//   (req, res) => {
//     // Přihlášení bylo úspěšné, můžete provést přesměrování nebo vrátit token atd.
//     res.redirect("/dashboard");
//   }
// );
// #endregion

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
