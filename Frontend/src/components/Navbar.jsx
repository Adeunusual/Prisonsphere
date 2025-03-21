/**
 * @file Navbar.js
 * @description Responsive and animated navigation bar for the PrisonSphere system.
 * @module components/Navbar
 *
 * This component:
 * - Displays the system's logo and branding.
 * - Provides conditional links for "Login" and "Back to Home".
 * - Uses Framer Motion for smooth animations.
 * - Implements a responsive and visually appealing navigation bar.
 *
 * Features:
 * - Animates into view when the page loads.
 * - Adapts to different pages by conditionally showing navigation links.
 *
 * @requires react - React library for building UI components.
 * @requires react-router-dom - Library for managing navigation.
 * @requires framer-motion - Animation library for smooth transitions.
 */

import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/images/logoBlue.png";

/**
 * Navbar Component
 * ----------------
 * - Displays the PrisonSphere logo and branding.
 * - Conditionally renders navigation links based on `showBackLink` and `showLoginLink` props.
 *
 * @component
 * @param {boolean} showBackLink - Determines if the "Back to Home" link should be displayed.
 * @param {boolean} showLoginLink - Determines if the "Login" link should be displayed.
 * @returns {JSX.Element} - The navigation bar component.
 */
const Navbar = ({ showBackLink, showLoginLink }) => {
  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 w-full flex justify-center py-4 shadow-sm rounded-md backdrop-blur-sm"
    >
      <div className="w-[90%] md:w-[80%] flex items-center justify-between">
        {/* Logo & Name */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="Prisonsphere Logo" className="w-10 h-10" />
          <span className="text-lg font-bold text-gray-800 tracking-wide">
            Prisonsphere
          </span>
        </div>
        {/* Conditonal rendering of Links */}
        <div className="flex items-center space-x-6">
          {showLoginLink && (
            <Link
              to="/login"
              className="text-blue-700 font-semibold hover:underline"
            >
              Login
            </Link>
          )}

          {showBackLink && (
            <Link
              to="/"
              className="text-blue-700 font-semibold hover:underline"
            >
              Back to Home
            </Link>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
