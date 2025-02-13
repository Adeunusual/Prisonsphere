const mongoose = require("mongoose");

const workProgramSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("WorkProgram", workProgramSchema);
