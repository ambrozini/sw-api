import { MongoClient } from "mongodb";

let client: MongoClient;

export function getDbClient(): MongoClient {
  if (!client) {
    client = new MongoClient(process.env.MONGO_URI);
  }

  return client;
}
