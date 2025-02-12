/**
 * This file sets up an in-memory MongoDB instance for testing purposes.
 * It provides functions to connect to, clear, and close the test database.
 *
 * @dependencies
 * - mongoose: MongoDB ODM for Node.js
 * - mongodb-memory-server: In-memory MongoDB instance for testing
 *
 * @exports
 * - connect(): Initializes and connects to an in-memory MongoDB instance.
 * - closeDatabase(): Drops the database, closes the connection, and stops the server.
 * - clearDatabase(): Clears all collections in the database.
 *
 * @usage
 * Import this module in your test setup to use a temporary, isolated MongoDB instance:
 *
 * const db = require("./databaseTestSetup");
 * beforeAll(async () => await db.connect());
 * afterEach(async () => await db.clearDatabase());
 * afterAll(async () => await db.closeDatabase());
 *
 * @author Faruq A. Atanda
 * @date 2025-02-10
 */

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

module.exports.connect = async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  //close previous connection before connecting again
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
  }

  await mongoose.connect(uri);
  console.log("✅ Test Database Connected");
};

module.exports.closeDatabase = async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
  console.log("✅ Test Database Closed");
};

module.exports.clearDatabase = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
};
