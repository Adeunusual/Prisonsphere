const express = require("express");
const {
  createActivityLog,
  getAllActivityLogs,
} = require("../controllers/activityLogController");
const { protect, isWarden } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, isWarden, createActivityLog);
router.get("/", protect, getAllActivityLogs);

module.exports = router;
