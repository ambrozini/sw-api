import { MongoMemoryServer } from "mongodb-memory-server";
import { getDbClient } from "../src/shared/get-db-client";

export = async function globalSetup() {
  const instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  (process as any).__MONGOINSTANCE = instance;
  process.env.MONGO_URI = uri.slice(0, uri.lastIndexOf("/"));

  process.env.MONGO_URI = "mongodb://admin:admin@127.0.0.1:27017";

  // The following is to make sure the database is clean before an test starts
  await getDbClient().connect();
  await getDbClient().db("sw").collection("characters").deleteMany({});
  await getDbClient().close();
};
