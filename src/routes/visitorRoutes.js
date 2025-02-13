const express = require("express");
const {
  registerVisitor,
  getAllVisitors,
  getVisitorById,
  updateVisitor,
  deleteVisitor,
} = require("../controllers/visitorController");
const { protect, isWarden } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, registerVisitor);
router.get("/", protect, getAllVisitors);
router.get("/:id", protect, getVisitorById);
router.put("/:id", protect, isWarden, updateVisitor);
router.delete("/:id", protect, isWarden, deleteVisitor);

module.exports = router;
