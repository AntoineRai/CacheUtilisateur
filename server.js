const express = require("express");
const app = express();
const path = require("path");
const bcrypt = require("bcrypt");
const Redis = require("ioredis");
const redisShowUser = require("./redisShowUser");
const createUser = require("./redisCreateUser"); // Importation du fichier redisCreateUser.js

// Middleware pour traiter les données POST
app.use(express.urlencoded({ extended: true }));

// Création d'un client Redis
const client = new Redis();

// Définir le dossier public pour servir les ressources statiques
app.use(express.static(path.join(__dirname)));

// Gérer la requête GET pour afficher la page de connexion
app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "login.html"));
});

// Gérer la requête POST pour la connexion de l'utilisateur
app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Récupérer les informations de l'utilisateur depuis Redis
  const user = await redisShowUser.getUserByUsername(username);

  // Vérifier si l'utilisateur existe et si le mot de passe est correct
  if (user && (await bcrypt.compare(password, user.password))) {
    // Stocker les informations de la session dans Redis
    const sessionId = await redisShowUser.createSession(user.id);
    console.log("Utilisateur connecté avec succès. Session ID :", sessionId);

    // Rediriger vers une nouvelle page avec un message de connexion réussie
    res.redirect("/success");
  } else {
    res.send("Identifiants de connexion invalides.");
  }
});

// Gérer la requête GET pour afficher la page de succès
app.get("/success", (req, res) => {
  res.send("La connexion a réussi !");
});

// Gérer la requête GET pour afficher la page d'inscription
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Gérer la requête POST pour créer un utilisateur
app.post("/register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await redisShowUser.getUserByUsername(username);
  if (existingUser) {
    res.send("Cet utilisateur existe déjà.");
  } else {
    // Créer l'utilisateur et stocker ses informations dans Redis
    await createUser(username, password);
    console.log("Utilisateur créé avec succès.");

    // Rediriger vers une page de succès ou afficher un message
    res.send("Utilisateur créé avec succès !");
  }
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Le serveur est en cours d'exécution sur le port 3000");
});
