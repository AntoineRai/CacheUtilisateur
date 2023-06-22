const Redis = require("ioredis");

// Création d'un client Redis
const client = new Redis();

// Fonction pour récupérer et afficher tous les utilisateurs avec leur ID
async function getAllUsers() {
  const userKeys = await client.keys("user:*");

  if (userKeys.length === 0) {
    console.log("Aucun utilisateur trouvé.");
    return;
  }

  const users = await Promise.all(
    userKeys.map(async (key) => {
      const userId = key.split(":")[1];
      const userData = await client.hgetall(key);
      return { id: userId, ...userData };
    })
  );

  console.log("Utilisateurs :", users);
}

// Exemple d'utilisation de la fonction getAllUsers
getAllUsers();
