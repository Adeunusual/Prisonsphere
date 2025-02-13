const mongoose = require("mongoose");

const paroleSchema = new mongoose.Schema(
  {
    inmate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inmate",
      required: true,
    },
    applicationDate: { type: Date, default: Date.now },
    hearingDate: { type: Date },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Denied"],
      default: "Pending",
    },
    decisionNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Parole", paroleSchema);
