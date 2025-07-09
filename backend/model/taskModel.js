const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: String, required: true },
});

// Prevent model overwrite error on hot-reload
module.exports = mongoose.models.Task || mongoose.model("Task", taskSchema);
