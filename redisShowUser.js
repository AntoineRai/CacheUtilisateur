const Redis = require("ioredis");

// Création d'un client Redis
const client = new Redis();

// Fonction pour récupérer un utilisateur par son nom d'utilisateur
async function getUserByUsername(username) {
  const userKeys = await client.keys("user:*");

  for (const key of userKeys) {
    const userData = await client.hgetall(key);

    if (userData.username === username) {
      return { id: key.split(":")[1], ...userData };
    }
  }

  return null; // Utilisateur non trouvé
}

// Fonction pour créer une session pour un utilisateur
async function createSession(userId) {
  const sessionId = generateSessionId();
  await client.set(`session:${sessionId}`, userId);
  return sessionId;
}

// Fonction pour générer un identifiant de session unique
function generateSessionId() {
  return Date.now().toString();
}

module.exports = {
  getUserByUsername,
  createSession,
};
