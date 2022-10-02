import { MongoMemoryServer } from "mongodb-memory-server";

export = async function globalTeardown() {
  const instance: MongoMemoryServer = (process as any).__MONGOINSTANCE;
  await instance.stop();
};
