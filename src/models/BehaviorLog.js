const mongoose = require("mongoose");

const behaviorLogSchema = new mongoose.Schema(
  {
    inmate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inmate",
      required: true,
    },
    workEthicRating: { type: Number, min: 1, max: 5 },
    cooperationRating: { type: Number, min: 1, max: 5 },
    incidentReports: { type: String },
    socialSkillProgress: { type: String },
    loggedBy: { type: String },
    dateLogged: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BehaviorLog", behaviorLogSchema);
