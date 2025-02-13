const mongoose = require("mongoose");

const workProgramEnrollmentSchema = new mongoose.Schema(
  {
    inmate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inmate",
      required: true,
    },
    workProgram: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "WorkProgram",
      required: true,
    },
    startDate: { type: Date, required: true },
    expectedCompletionDate: { type: Date, required: true },
    performanceRating: { type: Number, min: 1, max: 5 }, // 1-5 scale for evaluation
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "WorkProgramEnrollment",
  workProgramEnrollmentSchema
);
