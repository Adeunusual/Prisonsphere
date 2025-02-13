/**
 * Database Connection Configuration
 * ----------------------------------
 * This module establishes a connection to the MongoDB database
 * using Mongoose. It loads the database URI from environment
 * variables and ensures a successful connection before the
 * application starts.
 *
 * If the connection fails, it logs an error message and exits
 * the application to prevent further execution.
 *
 */

const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30s
      connectTimeoutMS: 30000, // Increase connection timeout
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`✅ Using Database: ${conn.connection.name}`); // LOG DATABASE NAME
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;
