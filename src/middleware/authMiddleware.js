/**
 * Authentication & Role-Based Access Middleware
 * ---------------------------------------------
 * This module provides middleware functions to secure API routes
 * by enforcing authentication and role-based access control (RBAC).
 *
 * Middleware Functions:
 * - protect → Ensures only authenticated users with a valid JWT token
 *   can access protected routes.
 * - authorizeRoles → Restricts access to specific user roles
 *   (Warden & Admin) based on predefined permissions.
 *
 * Security Features:
 * - Extracts JWT from the Authorization header.
 * - Verifies and decodes the token to authenticate users.
 * - Prevents access to unauthorized users.
 *
 */

const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const isWarden = (req, res, next) => {
  if (req.user.role !== "warden") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

module.exports = { protect, isWarden };
