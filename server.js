const express = require("express");
const app = express();
const path = require("path");
const createUser = require("./redisCreateUser");

// Middleware pour traiter les données POST
app.use(express.urlencoded({ extended: true }));

// Définir le dossier public pour servir les ressources statiques
app.use(express.static(path.join(__dirname)));

// Gérer la requête GET pour afficher la page d'inscription
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Gérer la requête POST pour créer un utilisateur
app.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Appeler la fonction createUser pour créer l'utilisateur
  createUser(username, password);

  // Rediriger vers une page de succès ou afficher un message
  res.send("Utilisateur créé avec succès !");
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Le serveur est en cours d'exécution sur le port 3000");
});
