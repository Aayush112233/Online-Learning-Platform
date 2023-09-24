import mongoose from "mongoose";
import CourseModel from "../models/Courses.js";
import StudentAssignment from "../models/StudentAssignment.js";
import StudentEnroll from "../models/StudentEnrollModal.js";
import AnnouncementModal from "../models/AnnouncmentModal.js";
import TeacherDocument from "../models/Teacher.js";
import QuizModel from "../models/QuizModal.js";
import AssignmentModal from "../models/AssignmentModal.js";
import UserModel from "../models/User.js";

class StudentController {
  static studentEnroll = async (req, res) => {
    try {
      const student = req.user._id;
      const { course, teacher } = req.body;
      const imageBuffer = req.file.buffer;

      const base64Image = `data:${
        req.file.mimetype
      };base64,${imageBuffer.toString("base64")}`;
      if (course && teacher) {
        const studentenroll = new StudentEnroll({
          student: student,
          teacher: teacher,
          course: course,
          paymentImage: base64Image,
        });

        studentenroll.save((err, done) => {
          if (err) {
            res.status(400).json({
              err,
            });
          } else {
            res.status(200).json({
              msg: "Student Enrolled Successfully",
            });
          }
        });
      } else {
        res.status(400).json({
          msg: "All fields are required",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };
  static getUnenrolledCourses = async (req, res) => {
    const studentId = req.user._id; // Assuming the student ID is passed in as a parameter
    try {
      const enrolledCourses = await StudentEnroll.find({
        student: studentId,
      }).select("course");
      const enrolledCourseIds = enrolledCourses.map((course) =>
        course.course.toString()
      );
      const unenrolledCourses = await CourseModel.find({
        _id: { $nin: enrolledCourseIds },
      });
      res.status(200).json(unenrolledCourses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  static getEnrolledCourses = async (req, res) => {
    const studentId = req.user._id; // Assuming the student ID is passed in as a parameter
    try {
      const enrolledCourses = await StudentEnroll.find({
        student: studentId,
      }).populate("course");
      res.status(200).json(enrolledCourses);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  static updateStudentStatus = async (req, res) => {
    try {
      const { id } = req.params;
      StudentEnroll.findByIdAndUpdate(
        { _id: id },
        { paymentStatus: true },
        (error, success) => {
          if (error) {
            res.status(400).json({
              status: "false",
              msg: "This enrollment is Unable to Update",
            });
          } else {
            res.status(200).json({
              status: "false",
              msg: "Student Status is Sucessfully Updated",
            });
          }
        }
      );
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };

  static GetEnrollmentDetails = async (req, res) => {
    try {
      const { id } = req.params;
      const studentId = req.user._id;
      const EnrollmentDetails = await StudentEnroll.find({
        student: studentId,
        teacher: id,
      });
      if (EnrollmentDetails) {
        res.status(200).json({
          EnrollmentDetails,
        });
      } else {
        res.status(400).json({
          msg: "No Enrollment Found",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };

  static SubmitAssignment = async (request, response) => {
    try {
      const { _id } = request.user;
      const { remarks, assignment } = request.body;
      if (!mongoose.Types.ObjectId.isValid(_id)) {
        return response.status(400).send("Invalid course ID");
      }

      const existingSubmit = await StudentAssignment.find({
        submittedBy: _id,
        assignment: assignment,
      });

      if (existingSubmit.length > 0) {
        return response.status(400).json({
          msg: "You have already submitted the assignment. ",
        });
      }
      const document = new StudentAssignment({
        remarks: remarks,
        submittedBy: _id,
        document: {
          data: request.file.buffer,
          contentType: request.file.mimetype,
        },
        assignment: assignment,
      });

      document.save((err) => {
        if (err) {
          response.status.json({
            msg: "Failed to submit Assignment",
          });
        } else {
          response.status(200).json({
            msg: "Assignment Submitted Successfully",
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  };

  static GetMyNotices = async (req, res) => {
    const { _id } = req.user;
    const studentId = _id;
    try {
      // Find all student enrollments for the given student ID
      const studentEnrollments = await StudentEnroll.find({
        student: studentId,
      });

      // Array to hold the announcements
      const announcements = [];

      // Iterate over each student enrollment
      for (const enrollment of studentEnrollments) {
        const teacherId = enrollment.teacher;

        // Retrieve the teacher document for the teacher ID
        const teacher = await TeacherDocument.findOne({ userId: teacherId });

        if (teacher) {
          const courseId = teacher.course;
          const course = await CourseModel.findOne({ _id: courseId });

          if (course) {
            const announcementsByTeacher = await AnnouncementModal.find({
              postedBy: teacherId,
            });

            if (announcementsByTeacher.length > 0) {
              // Add the course name to each announcement object
              const announcementsWithCourseName = announcementsByTeacher.map(
                (announcement) => {
                  return {
                    ...announcement._doc,
                    courseName: course.courseName,
                  };
                }
              );

              announcements.push(...announcementsWithCourseName);
            }
          }
        }
      }

      // Respond with the announcements
      res.status(200).json(announcements);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving announcements" });
    }
  };

  static GetMyAssignments = async (req, res) => {
    const { _id } = req.user;
    const studentId = _id;
    try {
      // Find all student enrollments for the given student ID
      const studentEnrollments = await StudentEnroll.find({
        student: studentId,
      });

      // Array to hold the announcements
      const assignments = [];

      // Iterate over each student enrollment
      for (const enrollment of studentEnrollments) {
        const teacherId = enrollment.teacher;

        // Retrieve the teacher document for the teacher ID
        const teacher = await TeacherDocument.findOne({ userId: teacherId });
        if (teacher) {
          const courseId = teacher.course;
          const course = await CourseModel.findOne({ _id: courseId });

          if (course) {
            const assignmentBy = await AssignmentModal.find({
              assignedBy: teacherId,
            });

            const teacherName = await UserModel.findById(teacherId).select(
              "firstName lastName"
            );

            console.log("");

            if (assignmentBy.length > 0) {
              // Add the course name to each announcement object
              const assignmentsWithCourseName = assignmentBy.map(
                (announcement) => {
                  return {
                    ...announcement._doc,
                    courseName: course.courseName,
                    teacherName:
                      teacherName.firstName + " " + teacherName.lastName,
                  };
                }
              );

              assignments.push(...assignmentsWithCourseName);
            }
          }
        }
      }

      // Respond with the assignments
      res.status(200).json(assignments);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving announcements" });
    }
  };
  static GetMyQuizzes = async (req, res) => {
    const { _id } = req.user;

    const studentId = _id;

    try {
      // Find all student enrollments for the given student ID
      const studentEnrollments = await StudentEnroll.find({
        student: studentId,
      });

      // Array to hold the quizzes
      const quizzes = [];

      // Iterate over each student enrollment
      for (const enrollment of studentEnrollments) {
        const courseId = enrollment.course;

        // Retrieve the course document for the course ID
        const course = await CourseModel.findOne({ _id: courseId });

        if (course) {
          const quizzesForCourse = await QuizModel.find({ courseId: courseId });

          if (quizzesForCourse.length > 0) {
            // Add the course name to each quiz object
            const quizzesWithCourseName = quizzesForCourse.map((quiz) => {
              return {
                ...quiz._doc,
                courseName: course.courseName,
              };
            });

            quizzes.push(...quizzesWithCourseName);
          }
        }
      }

      // Respond with the quizzes
      res.status(200).json(quizzes);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving quizzes" });
    }
  };
}

export default StudentController;
