import { ObjectId } from "mongodb";
import CourseModel from "../models/Courses.js";
class CourseController {
  //add Course
  static AddCourse = async (req, res) => {
    try {
      const {
        courseName,
        courseCode,
        courseDuration,
        coursePrice,
        courseDescription,
      } = req.body;
      const course = await CourseModel.findOne({
        $or: [{ courseName: courseName }, { courseCode: courseCode }],
      });
      if (course) {
        res.status(400).json({
          status: "false",
          msg: "This Course is already Exist",
        });
      } else {
        if (
          courseName &&
          courseCode &&
          courseDuration &&
          coursePrice &&
          courseDescription
        ) {
          const { mimetype, buffer } = req.file;

          const base64Image = `data:${mimetype};base64,${buffer.toString(
            "base64"
          )}`;
          const doc = new CourseModel({
            courseName: courseName,
            courseCode: courseCode,
            courseDuration: courseDuration,
            coursePrice: coursePrice,
            courseDescription: courseDescription,
            courseImage: base64Image,
          });
          await doc.save();
          res.status(200).json({
            status: "true",
            msg: "Course Sucessfully Added ",
          });
        } else {
          res.status(400).json({
            status: "false",
            msg: "Unable to add course",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  //course Update
  static UpdateCourse = async (req, res) => {
    try {
      const {
        courseName,
        courseCode,
        courseDuration,
        coursePrice,
        courseDescription,
      } = req.body;
      const id = req.params.id;
      const course = await CourseModel.findOne({
        $or: [{ courseName: courseName }, { courseCode: courseCode }],
      });
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "This course doesnot exist",
        });
      }
      const { mimetype, buffer } = req.file;

      const base64Image = `data:${mimetype};base64,${buffer.toString(
        "base64"
      )}`;
      CourseModel.findByIdAndUpdate(
        { _id: id },
        {
          courseName: courseName,
          courseCode: courseCode,
          courseDuration: courseDuration,
          coursePrice: coursePrice,
          courseDescription: courseDescription,
          courseImage: base64Image,
        },
        (error, success) => {
          if (error) {
            res.status(400).json({
              status: "false",
              msg: "This course is Unable to Update",
            });
          } else {
            res.status(200).json({
              status: "false",
              msg: "Course is Sucessfully Updated",
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  //course Delete
  static DeleteCourse = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "course doesnot exist",
        });
      } else {
        CourseModel.findByIdAndDelete({ _id: id }, (error, success) => {
          if (error) {
            res.status(400).json({
              status: "false",
              msg: "Course Failed Delete",
            });
          } else {
            res.status(200).json({
              status: "true",
              msg: "Course Sucessfully Deleted",
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  //Get all(/)
  static GetallCourse = async (req, res) => {
    try {
      const course = await CourseModel.find({});
      if (course) {
        res.status(200).json({
          courses: course,
          msg: "Data Fetched Successfully",
        });
      } else {
        res.status(500).json({
          msg: "Data is unable to fetched",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  //Get all(/:id)
  static GetallCourseById = async (req, res) => {
    try {
      const id = req.params.id;
      const course = await CourseModel.find({ _id: id });
      if (course) {
        res.status(200).json({
          course,
          msg: "Data Fetched Successfully",
        });
      } else {
        res.status(500).json({
          msg: "Data is unable to fetched",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };
}

export default CourseController;
