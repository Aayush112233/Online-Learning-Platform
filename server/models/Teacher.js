import mongoose from "mongoose";

const teacherDocumentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  document: {
    data: Buffer,
    contentType: String,
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courses",
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const TeacherDocument = mongoose.model(
  "TeacherDocument",
  teacherDocumentSchema
);

export default TeacherDocument;
