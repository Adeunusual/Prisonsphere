/**
 * User Schema (MongoDB Model)
 * ----------------------------
 * This module defines the Mongoose schema for user authentication
 * and role management within the PrisonSphere system.
 *
 * - `username` → Unique identifier for each user.
 * - `password` → Securely hashed password for authentication.
 * - `role` → Enum field defining user roles (Warden, Staff).
 *
 * Authentication Features:
 * - Uses **bcrypt.js** for secure password hashing.
 * - Includes a **static login method** to verify user credentials.
 *
 * Relationships:
 * - Used for **authentication & role-based access control (RBAC)**.
 *
 */

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["warden", "admin"],
      required: true,
      lowercase: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
