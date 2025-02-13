const express = require("express");
const {
  submitParoleApplication,
  getAllParoleApplications,
  updateParoleStatus,
  filterParolesByDate,
} = require("../controllers/paroleController");

const { protect, isWarden } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, isWarden, submitParoleApplication);
router.get("/", protect, getAllParoleApplications);
router.put("/:id", protect, isWarden, updateParoleStatus);
router.get("/filter", protect, filterParolesByDate);

module.exports = router;
