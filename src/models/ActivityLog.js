const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    inmate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inmate",
      required: true,
    },
    activityType: {
      type: String,
      enum: [
        "Counseling",
        "Education",
        "Conflict",
        "Recreation",
        "Health Session",
      ],
      required: true,
    },
    description: { type: String },
    date: { type: Date, required: true },
    loggedBy: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
