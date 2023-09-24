import mongoose from "mongoose";

const StudentCourseSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  course:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  }
});

const StudentCourseModel = mongoose.model(
  "student_course",
  StudentCourseSchema
);

export default StudentCourseModel;
