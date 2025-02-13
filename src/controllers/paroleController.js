const Parole = require("../models/Parole");
const Inmate = require("../models/Inmate");

// @desc   Submit Parole Application
// @route  POST /prisonsphere/paroles
// @access Warden Only
const submitParoleApplication = async (req, res) => {
  try {
    const { inmate, hearingDate } = req.body;

    const existingInmate = await Inmate.findById(inmate);
    if (!existingInmate)
      return res.status(404).json({ message: "Inmate not found" });

    const parole = await Parole.create({
      inmate,
      hearingDate,
    });

    res
      .status(201)
      .json({ message: "Parole application submitted successfully", parole });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get All Parole Applications
// @route  GET /prisonsphere/paroles
// @access Admin & Warden
const getAllParoleApplications = async (req, res) => {
  try {
    const paroles = await Parole.find().populate(
      "inmate",
      "firstName lastName inmateID"
    );
    res.status(200).json(paroles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update Parole Status (Approve/Deny)
// @route  PUT /prisonsphere/paroles/:id
// @access Warden Only
const updateParoleStatus = async (req, res) => {
  try {
    const { status, decisionNotes } = req.body;

    const parole = await Parole.findByIdAndUpdate(
      req.params.id,
      { status, decisionNotes },
      { new: true }
    );

    if (!parole)
      return res.status(404).json({ message: "Parole application not found" });

    res.status(200).json({ message: "Parole status updated", parole });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Filter Parole Hearings by Date
// @route  GET /prisonsphere/paroles/filter
// @access Admin & Warden
const filterParolesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const paroles = await Parole.find({
      hearingDate: { $gte: new Date(startDate), $lte: new Date(endDate) },
    }).populate("inmate", "firstName lastName inmateID");

    res.status(200).json(paroles);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  submitParoleApplication,
  getAllParoleApplications,
  updateParoleStatus,
  filterParolesByDate,
};
