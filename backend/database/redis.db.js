import { createClient } from "redis";
import dotenv from "dotenv";
dotenv.config();

async function initializeRedis() {
  const client = createClient({
    url: process.env.REDIS_URL
  });

  await client.connect();

  client.on("error", (err) => console.log("Redis Client Error", err));

  client.on("end", () => {
    console.log("Redis connection closed");
  });

  process.on("SIGINT", () => {
    client.quit(() => {
      console.log("Redis client disconnected through app termination");
      process.exit(0);
    });
  });

  return client;
}

const client = await initializeRedis();
export default client;
