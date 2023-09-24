import mongoose from "mongoose";

const assignmentSubmit = new mongoose.Schema({
  remarks: {
    type: String,
    require: true,
  },
  submittedOn: {
    type: Date,
    default: Date.now,
  },
  submittedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  document: {
    data: Buffer,
    contentType: String,
    // require:true
  },
  assignment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "assignment",
    required: true,
  },
});

//Model
const StudentAssignment = mongoose.model(
  "student_assignment",
  assignmentSubmit
);

export default StudentAssignment;
