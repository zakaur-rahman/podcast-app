import { createClient } from "redis";

const client = await createClient({
  url : "redis://red-cm9f1ovqd2ns73dpq650:6379"
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
 