const mongoose = require("mongoose");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const WorkProgram = require("./src/models/WorkProgram");

dotenv.config();
connectDB();

const seedWorkPrograms = async () => {
  const workPrograms = [
    {
      name: "Kitchen Services",
      description: "Food preparation and kitchen duties.",
    },
    {
      name: "Carpentry Workshop",
      description: "Woodwork and furniture making.",
    },
    { name: "Tailoring Unit", description: "Sewing and garment production." },
    {
      name: "Agricultural Program",
      description: "Farming and crop production.",
    },
    { name: "Laundry Services", description: "Laundry and uniform services." },
    {
      name: "Maintenance Crew",
      description: "Facility maintenance and repair.",
    },
    {
      name: "Cleaning & Sanitation",
      description: "Cleaning and hygiene services.",
    },
    {
      name: "Educational Support",
      description: "Teaching and literacy programs.",
    },
  ];

  try {
    await WorkProgram.deleteMany();
    await WorkProgram.insertMany(workPrograms);
    console.log("✅ Work Programs Seeded Successfully!");
    process.exit();
  } catch (error) {
    console.error("❌ Seeding Failed:", error);
    process.exit(1);
  }
};

seedWorkPrograms();
