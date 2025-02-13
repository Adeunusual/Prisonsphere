const mongoose = require("mongoose");
const Inmate = require("../models/Inmate");

// @desc   Register a new inmate
// @route  POST /prisonsphere/inmates
// @access Warden Only
const registerInmate = async (req, res) => {
  try {
    console.log("DEBUG: Register Inmate Request from User", req.user);

    if (req.user.role !== "warden") {
      return res.status(403).json({ message: "Access denied" });
    }
    const {
      firstName,
      lastName,
      inmateID,
      dateOfBirth,
      gender,
      admissionDate,
      crimeDetails,
      assignedCell,
    } = req.body; //extract details from req.body

    const existingInmate = await Inmate.findOne({ inmateID });
    if (existingInmate)
      return res.status(400).json({ message: "Inmate ID already exists" });

    const inmate = await Inmate.create({
      firstName,
      lastName,
      inmateID,
      dateOfBirth,
      gender,
      admissionDate,
      crimeDetails,
      assignedCell,
    });

    res.status(201).json({ message: "Inmate registered successfully", inmate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all inmates
// @route  GET /prisonsphere/inmates
// @access Admin & Warden
const getAllInmates = async (req, res) => {
  try {
    const inmates = await Inmate.find();
    res.status(200).json(inmates);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get a single inmate
// @route  GET /prisonsphere/inmates/:id
// @access Admin & Warden
const getInmateById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid inmate ID format" });
    }
    const inmate = await Inmate.findById(req.params.id);
    if (!inmate) return res.status(404).json({ message: "Inmate not found" });

    res.status(200).json(inmate);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update an inmate's details
// @route  PUT /prisonsphere/inmates/:id
// @access Warden Only
const updateInmate = async (req, res) => {
  try {
    const inmate = await Inmate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!inmate) return res.status(404).json({ message: "Inmate not found" });

    res.status(200).json({ message: "Inmate updated successfully", inmate });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete an inmate
// @route  DELETE /prisonsphere/inmates/:id
// @access Warden Only
const deleteInmate = async (req, res) => {
  try {
    const inmate = await Inmate.findByIdAndDelete(req.params.id);
    if (!inmate) return res.status(404).json({ message: "Inmate not found" });

    res.status(200).json({ message: "Inmate deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerInmate,
  getAllInmates,
  getInmateById,
  updateInmate,
  deleteInmate,
};
