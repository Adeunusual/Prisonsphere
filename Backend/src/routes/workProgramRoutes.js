const express = require("express");
const {
  getWorkPrograms,
  enrollInWorkProgram,
  getEnrollments,
  getEnrollmentsByInmate,
} = require("../controllers/workProgramController");
const { protect, isWarden } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", protect, getWorkPrograms); // For dropdown
router.post("/enroll", protect, isWarden, enrollInWorkProgram);
router.get("/enrollments", protect, getEnrollments);
router.get("/enrollments/inmate/:inmateId", protect, getEnrollmentsByInmate);

module.exports = router;
