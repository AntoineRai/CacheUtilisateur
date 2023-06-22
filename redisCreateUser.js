const Redis = require("ioredis");
const bcrypt = require("bcrypt");
const saltRounds = 10;

// Création d'un client Redis
const client = new Redis();

// Fonction pour créer un nouvel utilisateur
async function createUser(username, password) {
  // Génération d'un identifiant unique pour l'utilisateur
  const userId = generateUniqueId();

  // Hachage du mot de passe
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Stockage des informations de l'utilisateur dans Redis
  await client.hmset(
    `user:${userId}`,
    "username",
    username,
    "password",
    hashedPassword
  );

  console.log("Utilisateur créé avec succès !");
}

// Fonction pour générer un identifiant unique
function generateUniqueId() {
  return Date.now().toString();
}

module.exports = createUser;
