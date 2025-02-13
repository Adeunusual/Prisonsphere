const express = require("express");
const {
  createBehaviorLog,
  getAllBehaviorLogs,
} = require("../controllers/behaviorLogController");
const { protect, isWarden } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, isWarden, createBehaviorLog);
router.get("/", protect, getAllBehaviorLogs);

module.exports = router;
