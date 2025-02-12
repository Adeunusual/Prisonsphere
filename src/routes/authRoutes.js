/*
 * Authentication Routes
 * ----------------------
 * This module defines the authentication-related routes for
 * the PrisonSphere system, handling user login and logout functionality.
 *
 * Routes:
 * - `GET /prisonsphere/auth/login` → Renders the login page.
 * - `POST /prisonsphere/auth/login` → Processes user login and returns a JWT token.
 * - `GET /prisonsphere/auth/logout` → Logs the user out and invalidates the session.
 *
 * Middleware:
 * - Authentication and session handling is managed via the **authController**.
 *
 */

const express = require("express");
const {
  login_post,
  login_get,
  logout,
} = require("../controllers/authController");

const router = express.Router();

router.post("/login", login_post); // Login User
router.get("/login", login_get); // Check if User is Logged In
router.get("/logout", logout); // Logout User

module.exports = router;
