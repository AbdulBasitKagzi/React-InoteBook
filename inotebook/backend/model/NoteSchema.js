const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  date: {
    type: date,
    default: Date.now,
  },
});

const Notes = mongoose.model("notes", NotesSchema);

module.exports = Notes;
