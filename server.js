// Node Imports
const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//Project files Imports
const connectDB = require("./src/config/db");
const errorHandler = require("./src/middleware/errorMiddleware");
const { protect, isWarden } = require("./src/middleware/authMiddleware");

//Routes
const authRoutes = require("./src/routes/authRoutes");
const inmateRoutes = require("./src/routes/inmateRoutes");
const visitorRoutes = require("./src/routes/visitorRoutes");
const paroleRoutes = require("./src/routes/paroleRoutes");

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
app.use("/prisonsphere/inmates", inmateRoutes);
app.use("/prisonsphere/visitors", visitorRoutes);
app.use("/prisonsphere/paroles", paroleRoutes);

// Use error handling middleware
app.use(errorHandler);

if (process.env.NODE_ENV !== "test") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
}

// Export app for testing Purpose
module.exports = app;
