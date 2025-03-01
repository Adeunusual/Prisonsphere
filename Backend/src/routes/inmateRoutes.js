const express = require("express");
const {
  registerInmate,
  getAllInmates,
  getInmateById,
  updateInmate,
  deleteInmate,
} = require("../controllers/inmateController");
const { protect, isWarden } = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware"); // Import upload middleware

const router = express.Router();

router.post(
  "/",
  protect,
  isWarden,
  upload.single("profileImage"),
  registerInmate
);
router.get("/", protect, getAllInmates);
router.get("/:id", protect, getInmateById);
router.put("/:id", protect, isWarden, updateInmate);
router.delete("/:id", protect, isWarden, deleteInmate);

module.exports = router;
