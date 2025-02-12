// Node Imports
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Project files Imports
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authRoutes");
const errorHandler = require("./src/middleware/errorMiddleware");
const { protect, isWarden } = require("./src/middleware/authMiddleware");

dotenv.config();

//connect to DB
connectDB();

//Instantiate an Instance of a express
const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Security Middleware
app.use(cookieParser());
app.use(cors({ credentials: true, origin: "*" }));

//Routes
app.use("/prisonsphere/auth", authRoutes);

//Test
app.get("/prisonsphere/protected", protect, (req, res) => {
  res.json({ message: "You have accessed a protected route!", user: req.user });
});

// Use error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

// Export app for testing Purpose
module.exports = app;
