const ActivityLog = require("../models/ActivityLog");
const Inmate = require("../models/Inmate");

// @desc   Create an Activity Log Entry
// @route  POST /prisonsphere/activity-logs
// @access Warden Only
const createActivityLog = async (req, res) => {
  try {
    const { inmate, activityType, description, date, loggedBy } = req.body;

    const existingInmate = await Inmate.findById(inmate);
    if (!existingInmate)
      return res.status(404).json({ message: "Inmate not found" });

    const activityLog = await ActivityLog.create({
      inmate,
      activityType,
      description,
      date,
      loggedBy,
    });

    res
      .status(201)
      .json({ message: "Activity log created successfully", activityLog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get All Activity Logs
// @route  GET /prisonsphere/activity-logs
// @access Admin & Warden
const getAllActivityLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find().populate(
      "inmate",
      "firstName lastName inmateID"
    );
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { createActivityLog, getAllActivityLogs };
