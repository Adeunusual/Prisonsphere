const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const inmateSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    inmateID: { type: String, required: true, unique: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    admissionDate: { type: Date, required: true },
    releaseDate: { type: Date },
    crimeDetails: { type: String, required: true },
    status: {
      type: String,
      enum: ["Incarcerated", "Released"],
      default: "Incarcerated",
    },
    assignedCell: { type: String },
    behaviorReports: [
      { type: mongoose.Schema.Types.ObjectId, ref: "BehaviorReport" },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Inmate", inmateSchema);
