/**
 * Authentication Controller
 * --------------------------
 * This module handles user authentication within the PrisonSphere system,
 * including login, logout, and JWT token generation.
 *
 * Controller Functions:
 * - login_get → Renders the login page (Placeholder for frontend integration).
 * - login_post → Handles user authentication, verifies credentials, and generates JWT.
 * - logout_get → Clears JWT token by resetting the cookie.
 *
 * Authentication Features:
 * - Uses **bcrypt.js** to securely compare hashed passwords.
 * - Generates **JWT tokens** with a 3-day expiration (maxAge set to 3 days).
 * - Stores JWT in an **HTTP-only cookie** for security.
 *
 * Security:
 * - Ensures only valid users can obtain a token.
 * - Passwords are never returned in responses.
 *
 */

const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// POST - Login User
const login_post = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    // Generate JWT Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Set cookie with JWT
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
    });
    res.json({ message: "Login successful", token, role: user.role });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET - Verify Login Status
const login_get = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ message: "Not logged in" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({ message: "Authenticated", user: decoded });
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired session" });
  }
};

// GET - Logout User
const logout = async (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
};

module.exports = { login_post, login_get, logout };
