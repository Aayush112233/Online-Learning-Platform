import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  assignedDate: {
    type: Date,
    default: Date.now,
  },
  deadlineDate: {
    type: Date,
    require: true,
  },
  assignedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

//Model
const AssignmentModal = mongoose.model("assignment", assignmentSchema);

export default AssignmentModal;
