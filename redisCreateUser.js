const Redis = require("ioredis");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const client = new Redis();

async function createUser(username, password) {
  const userId = generateUniqueId();

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  await client.hmset(
    `user:${userId}`,
    "username",
    username,
    "password",
    hashedPassword
  );

  console.log("Utilisateur créé avec succès !");
}

function generateUniqueId() {
  return Date.now().toString();
}

module.exports = createUser;
