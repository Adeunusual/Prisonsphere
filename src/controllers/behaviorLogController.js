const BehaviorLog = require("../models/BehaviorLog");
const Inmate = require("../models/Inmate");

// @desc   Create a Behavior Log Entry
// @route  POST /prisonsphere/behavior-logs
// @access Warden Only
const createBehaviorLog = async (req, res) => {
  try {
    const {
      inmate,
      workEthicRating,
      cooperationRating,
      incidentReports,
      socialSkillProgress,
      loggedBy,
    } = req.body;

    const existingInmate = await Inmate.findById(inmate);
    if (!existingInmate)
      return res.status(404).json({ message: "Inmate not found" });

    const log = await BehaviorLog.create({
      inmate,
      workEthicRating,
      cooperationRating,
      incidentReports,
      socialSkillProgress,
      loggedBy,
    });

    res.status(201).json({ message: "Behavior log created successfully", log });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get All Behavior Logs
// @route  GET /prisonsphere/behavior-logs
// @access Admin & Warden
const getAllBehaviorLogs = async (req, res) => {
  try {
    const logs = await BehaviorLog.find().populate(
      "inmate",
      "firstName lastName inmateID"
    );
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createBehaviorLog, getAllBehaviorLogs };
