import mongoose from "mongoose";

//defining course schema
const courseSchema = new mongoose.Schema({
  courseName: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  courseCode: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  courseDuration: {
    type: String,
    required: true,
    trim: true,
  },
  coursePrice: {
    type: String,
    required: true,
    trim: true,
  },
  courseDescription: {
    type: String,
    required: true,
    trim: true,
  },
  courseImage: {
    type: String,
    required: true,
  },
});

//Model
const CourseModel = mongoose.model("courses", courseSchema);

export default CourseModel;
