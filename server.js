const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const Redis = require("ioredis");
const redisShowUser = require("./redisShowUser");
const createUser = require("./redisCreateUser");
const cookieParser = require("cookie-parser");

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

const client = new Redis();

app.use(express.static(path.join(__dirname)));

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const user = await redisShowUser.getUserByUsername(username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const sessionId = await redisShowUser.createSession(user.id);
    console.log("Utilisateur connecté avec succès. Session ID :", sessionId);

    res.cookie("sessionId", sessionId);

    res.redirect("/success");
  } else {
    const message =
      "Identifiants de connexion invalides. <a href='/login'>Revenir sur la page de connexion</a>";
    res.send(message);
  }
});

app.get("/success", (req, res) => {
  const message =
    "La connexion a réussi ! <a href='/login'>Changer de compte</a>";
  res.send(message);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  const existingUser = await redisShowUser.getUserByUsername(username);
  if (existingUser) {
    const message =
      "Cet utilisateur existe déjà. <a href='/index.html'>Revenir sur la page d'inscription</a>";
    res.send(message);
  } else {
    await createUser(username, password);
    console.log("Utilisateur créé avec succès.");

    const message =
      "Utilisateur créé avec succès ! <a href='/login'>Connectez-vous ici</a>";
    res.send(message);
  }
});

app.listen(3000, () => {
  console.log("Le serveur est en cours d'exécution sur le port localhost:3000/index.html");
});
