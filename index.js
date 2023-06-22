const express = require("express");
const app = express();

const port = 3000; // Choisissez le port que vous souhaitez utiliser

app.listen(port, () => {
  console.log(`Le serveur est en cours d'exécution sur le port ${port}`);
});

app.post("/users", async (req, res) => {
  // Récupérer les données de la requête (par exemple, nom d'utilisateur et mot de passe)
  const { username, password } = req.body;

  try {
    // Générer un identifiant unique pour l'utilisateur
    const userId = generateUniqueId();

    // Stocker les informations de l'utilisateur dans Redis
    await redis.hmset(`user:${userId}`, {
      username,
      password,
    });

    res.status(201).json({ message: "Utilisateur créé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la création de l'utilisateur :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de l'utilisateur." });
  }
});

const { v4: uuidv4 } = require("uuid");

function generateUniqueId() {
  return uuidv4();
}
