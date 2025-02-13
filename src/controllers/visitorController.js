const Visitor = require("../models/Visitor");
const Inmate = require("../models/Inmate");

// @desc   Register a new visitor
// @route  POST /prisonsphere/visitors
// @access Admin & Warden
const registerVisitor = async (req, res) => {
  try {
    const {
      visitorName,
      visitorID,
      relationshipToInmate,
      inmate,
      visitDate,
      purposeOfVisit,
      staffNotes,
    } = req.body;

    const existingVisitor = await Visitor.findOne({ visitorID });
    if (existingVisitor)
      return res.status(400).json({ message: "Visitor ID already exists" });

    const existingInmate = await Inmate.findById(inmate);
    if (!existingInmate)
      return res.status(404).json({ message: "Inmate not found" });

    const visitor = await Visitor.create({
      visitorName,
      visitorID,
      relationshipToInmate,
      inmate,
      visitDate,
      purposeOfVisit,
      staffNotes,
    });

    res
      .status(201)
      .json({ message: "Visitor registered successfully", visitor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get all visitors
// @route  GET /prisonsphere/visitors
// @access Admin & Warden
const getAllVisitors = async (req, res) => {
  try {
    const visitors = await Visitor.find().populate(
      "inmate",
      "firstName lastName inmateID"
    );
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Get a single visitor
// @route  GET /prisonsphere/visitors/:id
// @access Admin & Warden
const getVisitorById = async (req, res) => {
  try {
    const visitor = await Visitor.findById(req.params.id).populate(
      "inmate",
      "firstName lastName inmateID"
    );
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    res.status(200).json(visitor);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Update a visitor's details
// @route  PUT /prisonsphere/visitors/:id
// @access Warden Only
const updateVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    res.status(200).json({ message: "Visitor updated successfully", visitor });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// @desc   Delete a visitor record
// @route  DELETE /prisonsphere/visitors/:id
// @access Warden Only
const deleteVisitor = async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);
    if (!visitor) return res.status(404).json({ message: "Visitor not found" });

    res.status(200).json({ message: "Visitor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  registerVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
};
