/*
 * manageUsers.js - User Management Script for PrisonSphere PMS
 * 
 * Description:
    This script is designed to manage user accounts (Warden & Admin) in the Prisonsphere 
    Prison Management System. It allows IT administrators to securely create, update, 
    delete, and list user credentials without requiring a frontend interface.
 *
 * Usage: Create new users with role-based access control (Warden or Admin)
    node manageUsers.js create <username> <password> <role>
    node manageUsers.js update <username> <newPassword>
    node manageUsers.js delete <username>
    node manageUsers.js list

 * Author: Faruq A. Atanda (github.com/adeunusual)
 * Date: 6th Feb, 2025.
*/
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./src/models/User");
const connectDB = require("./src/config/db");

dotenv.config();

// Connect to MongoDB
const init = async () => {
  await connectDB();
  console.log("✅ Database Connected Successfully for User Management!");

  // Process command AFTER connection is ready
  // Function to create a new user
  const createUser = async (username, password, role) => {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log(`⚠️ User "${username}" already exists.`);
      process.exit();
    }

    await User.create({ username, password, role });

    console.log(`✅ User "${username}" created successfully.`);
    process.exit();
  };

  // Function to update an existing user's password
  const updateUserPassword = async (username, newPassword) => {
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`⚠️ User "${username}" not found.`);
      process.exit();
    }

    user.password = newPassword;
    await user.save(); // The pre-save hook will hash password before update

    console.log(`✅ Password for "${username}" updated successfully.`);
    process.exit();
  };

  // Function to delete a user
  const deleteUser = async (username) => {
    const user = await User.findOneAndDelete({ username });
    if (!user) {
      console.log(`⚠️ User "${username}" not found.`);
      process.exit();
    }

    console.log(`✅ User "${username}" deleted successfully.`);
    process.exit();
  };

  // Function to list all users
  const listUsers = async () => {
    const users = await User.find();
    console.log("📋 List of Users:");
    users.forEach((user) => {
      console.log(`- ${user.username} (${user.role})`);
    });
    process.exit();
  };

  // Command-line arguments handling
  const command = process.argv[2]; // Command: create, update, delete, list
  const username = process.argv[3]; // Username
  const passwordOrRole = process.argv[4]; // Password (for create/update) or Role (for create)
  const role = process.argv[5]; // Role (for create)

  if (command === "create") {
    if (!username || !passwordOrRole || !role) {
      console.log(
        "⚠️ Usage: node manageUsers.js create <username> <password> <role>"
      );
      process.exit();
    }
    createUser(username, passwordOrRole, role);
  } else if (command === "update") {
    if (!username || !passwordOrRole) {
      console.log(
        "⚠️ Usage: node manageUsers.js update <username> <newPassword>"
      );
      process.exit();
    }
    updateUserPassword(username, passwordOrRole);
  } else if (command === "delete") {
    if (!username) {
      console.log("⚠️ Usage: node manageUsers.js delete <username>");
      process.exit();
    }
    deleteUser(username);
  } else if (command === "list") {
    listUsers();
  } else {
    console.log("⚠️ Invalid command. Use: create, update, delete, or list.");
    process.exit();
  }
};

init();
