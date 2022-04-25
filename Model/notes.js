const mongoose = require("mongoose");
const notesSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  description: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["GENERAL", "IDPROOF", "PROFFESSIONAL"],
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
  createdOn: { type: Date, default: Date.now },
});

module.exports = mongoose.model("notes", notesSchema);
