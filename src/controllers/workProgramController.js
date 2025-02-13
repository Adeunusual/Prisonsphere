const WorkProgram = require("../models/WorkProgram");
const WorkProgramEnrollment = require("../models/WorkProgramEnrollment");
const Inmate = require("../models/Inmate");

// Fetch all work programs for Dropdown Selection
const getWorkPrograms = async (req, res) => {
  try {
    const programs = await WorkProgram.find();
    res.status(200).json(programs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Enroll an inmate in a work program
const enrollInWorkProgram = async (req, res) => {
  try {
    const {
      inmate,
      workProgram,
      startDate,
      expectedCompletionDate,
      performanceRating,
    } = req.body;

    const existingInmate = await Inmate.findById(inmate);
    const existingProgram = await WorkProgram.findById(workProgram);
    if (!existingInmate || !existingProgram) {
      return res.status(404).json({ message: "Inmate or Program not found" });
    }

    const enrollment = await WorkProgramEnrollment.create({
      inmate,
      workProgram,
      startDate,
      expectedCompletionDate,
      performanceRating,
    });

    res.status(201).json({ message: "Enrollment successful", enrollment });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Fetch all work program enrollments
const getEnrollments = async (req, res) => {
  try {
    const enrollments = await WorkProgramEnrollment.find()
      .populate("inmate", "firstName lastName inmateID")
      .populate("workProgram", "name");

    res.status(200).json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { getWorkPrograms, enrollInWorkProgram, getEnrollments };
