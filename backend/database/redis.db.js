import { createClient } from "redis";

const client = await createClient({
  url : "rediss://red-cm9f1ovqd2ns73dpq650:YBUVwIzafi2tlViIOY1OF7mw02OAaGnP@oregon-redis.render.com:6379"
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();


client.on("end", () => {
  console.log("Redis connection closed");
});

process.on("SIGINT", () => {
  client.quit();
});

export default client;
 