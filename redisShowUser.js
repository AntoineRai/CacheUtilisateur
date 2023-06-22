const Redis = require("ioredis");

const client = new Redis();

async function getUserByUsername(username) {
  const userKeys = await client.keys("user:*");

  for (const key of userKeys) {
    const userData = await client.hgetall(key);

    if (userData.username === username) {
      return { id: key.split(":")[1], ...userData };
    }
  }

  return null;
}

async function createSession(userId) {
  const sessionId = generateSessionId();
  await client.set(`session:${sessionId}`, userId);
  return sessionId;
}

function generateSessionId() {
  return Date.now().toString();
}

module.exports = {
  getUserByUsername,
  createSession,
};
