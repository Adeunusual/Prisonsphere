const mongoose = require("mongoose");

const visitorSchema = new mongoose.Schema(
  {
    visitorName: { type: String, required: true },
    visitorID: { type: String, required: true, unique: true },
    relationshipToInmate: { type: String, required: true },
    inmate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Inmate",
      required: true,
    },
    visitDate: { type: Date, required: true },
    purposeOfVisit: { type: String, required: true },
    staffNotes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Visitor", visitorSchema);
