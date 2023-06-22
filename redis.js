const Redis = require("ioredis");
const redis = new Redis();

redis.set("message", "Hello Redis!");
redis.get("message", (err, result) => {
  console.log(result);
});
