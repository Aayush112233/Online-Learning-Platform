import mongoose from "mongoose";

const studentEnrollSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  paymentImage: {
    type: String,
    require: true,
  },
  hasRated: {
    type: Boolean,
    default: false,
  },
  enrollDate: {
    type: Date,
    default: Date.now,
  },
});

const StudentEnroll = mongoose.model("student_enrollment", studentEnrollSchema);

export default StudentEnroll;
