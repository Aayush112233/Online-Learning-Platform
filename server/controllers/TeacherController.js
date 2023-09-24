import mongoose from "mongoose";
import transproter from "../config/emailConfig.js";
import AnnouncementModal from "../models/AnnouncmentModal.js";
import TeacherDocument from "../models/Teacher.js";
import ejs from "ejs";
import { ObjectId } from "mongodb";
import TeacherPaymentModal from "../models/TeacherPaymentModal.js";
import StudentEnroll from "../models/StudentEnrollModal.js";
import QuizModel from "../models/QuizModal.js";
import RatingModel from "../models/TeacherRatingModal.js";
import AssignmentModal from "../models/AssignmentModal.js";
import StudentAssignment from "../models/StudentAssignment.js";

// Set storage engine for multer
class TeacherController {
  static TeacherDocument = async (req, res) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send("Failed to download document");
    }
  };

  static GetTeacherDocumentByID = async (req, res) => {
    try {
      const document = await TeacherDocument.findById(req.params.id);
      if (!document) {
        return res.status(404).send("Document not found");
      }

      res.set("Content-Type", document.document.contentType);
      res.send(document.document.data);
    } catch (error) {
      res.status(500).send("Failed to download document");
    }
  };
  static GetStudentDocumentByID = async (req, res) => {
    try {
      const document = await StudentAssignment.findById(req.params.id);
      if (!document) {
        return res.status(404).send("Document not found");
      }

      res.set("Content-Type", document.document.contentType);
      res.send(document.document.data);
    } catch (error) {
      res.status(500).send("Failed to download document");
    }
  };

  //get all document(teacher)
  static GetDocument = async (req, res) => {
    try {
      const document = await TeacherDocument.aggregate([
        {
          $lookup: {
            from: "users",
            localField: "userId",
            foreignField: "_id",
            as: "user_detail",
          },
        },
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "course",
          },
        },
      ]);
      res.status(200).json({
        document,
      });
    } catch (error) {
      res.status(500).send(error);
    }
  };

  static GetDocumentByTeacher = async (req, res) => {
    try {
      const teacherVerify = await TeacherDocument.findOne({
        userId: req.user._id,
      });
      res.status(200).json({
        teacherVerify,
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static ChangeStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status, email } = req.body;
      if (id) {
        const update = { isVerified: status };

        TeacherDocument.findByIdAndUpdate(
          id,
          update,
          { new: true },
          async (err, updatedDocument) => {
            if (err) {
              res.status(400).json({
                msg: err,
              });
            } else {
              if (status && email) {
                const html = await ejs.renderFile("./pages/VerifyTeacher.html");
                let info = await transproter.sendMail({
                  from: process.env.EMAIL_FROM,
                  to: email,
                  subject: "Verify Confimation",
                  html: html,
                });
                res.status(200).json({
                  msg: "Status updated.",
                });
              } else {
                res.status(200).json({
                  msg: "Status updated.",
                });
              }
            }
          }
        );
      } else {
        res.status(400).json({
          msg: "Id not found",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static ChangeQR = async (req, res) => {
    try {
      const { _id: userId } = req.user;
      const { mimetype, buffer } = req.file;

      const base64Image = `data:${mimetype};base64,${buffer.toString(
        "base64"
      )}`;

      const result = await TeacherPaymentModal.findOneAndUpdate(
        { teacherId: userId },
        { qrImage: base64Image }
      );

      if (!result) {
        throw new Error("Id not found");
      }

      res.status(200).json({
        msg: "QR image saved successfully",
      });
    } catch (error) {
      res.status(400).json({
        msg: error.message,
      });
    }
  };

  static getAllForTeacher = async (req, res) => {
    try {
      const user = req.user;
      const TeacherCourse = await TeacherDocument.findOne({
        userId: user._id,
        isVerified: true,
      }).select("-document");
      if (TeacherCourse) {
        const alldetails = await TeacherCourse.populate("course");
        if (alldetails) {
          res.status(200).json({
            alldetails,
          });
        } else {
          res.status(400).json({
            msg: "UnAuthorized",
          });
        }
      } else {
        res.status(400).json({
          msg: "Teacher Not Verified or not found",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static PostAnnouncement = async (req, res) => {
    try {
      const id = req.user._id;
      req.body.postedBy = id;
      const document = new AnnouncementModal(req.body);
      document.save((err) => {
        if (err) {
          return response.status(500).send("Failed to postAnnouncement");
        }
        res.status(200).json({
          document,
          msg: "Annoucement posted successfully.",
        });
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static EditAnnouncement = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, post } = req.body;
      if (title && post) {
        AnnouncementModal.findByIdAndUpdate(
          { _id: id },
          {
            title: title,
            post: post,
          },
          (error, success) => {
            if (error) {
              res.status(400).json({
                status: "false",
                msg: "This post is Unable to Update",
              });
            } else {
              res.status(200).json({
                status: "false",
                msg: "Post is Sucessfully Updated",
              });
            }
          }
        );
      } else {
        res.status(400).json({
          msg: "Field to update are missing",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static DeleteAnouncement = async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "No teacher to the announce is found doesnt exit",
        });
      }
      AnnouncementModal.findByIdAndDelete({ _id: id }, (error, success) => {
        if (error) {
          res.status(400).json({
            status: "false",
            msg: "This post is Unable to delete",
          });
        } else {
          res.status(200).json({
            status: "false",
            msg: "Post is Sucessfully Deleted",
          });
        }
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getAnnouncementByTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      const teacherId = mongoose.Types.ObjectId(id);
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "No teacher to the announce is found doesnt exit",
        });
      } else {
        const announcements = await AnnouncementModal.find({
          postedBy: teacherId,
        }).sort({ date: -1 }); // Add sort function to sort by date in descending order
        if (announcements.length > 0) {
          // Check if the array has any elements
          res.status(200).json({
            announcements,
          });
        } else {
          res.status(400).json({
            msg: "Announcement not found",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static postQRCode = async (req, res, next) => {
    try {
      const { teacherId, qrImage } = req.body;
      if (teacherId && qrImage) {
        const existingTeacher = await TeacherPaymentModal.find({
          teacherId: teacherId,
        });
        if (existingTeacher) {
          res.status(400).json({
            msg: "Teacher already has a payment QR",
          });
        } else {
          const paymentQR = new TeacherPaymentModal(req.body);
          paymentQR.save((err) => {
            if (err) {
              return response.status(500).send("Failed to post Payment ");
            }
            res.status(200).json({
              paymentQR,
              msg: "Payment posted successfully.",
            });
          });
        }
      } else {
        res.status(400).json({
          msg: "All fields are required",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getApprovedTeachersByCourseId = async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "No teacher found doesnt exit",
        });
      } else {
        const teachers = await TeacherDocument.find({
          course: id,
          isVerified: true,
        })
          .populate("userId", "-profilePic")
          .select("-document -userId.profilePic");

        const ratingsPromises = teachers.map(async (teacher) => {
          const ratings = await RatingModel.find({
            teacher: teacher.userId?._id,
          });
          const averageRating =
            ratings.reduce((sum, rating) => sum + rating.rating, 0) /
              ratings.length || 0;
          return { ...teacher.toObject(), rating: averageRating };
        });

        const teachersWithRating = await Promise.all(ratingsPromises);

        res.status(200).json({
          teachers: teachersWithRating,
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getPaymentImageByTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "No teacher found doesnt exit",
        });
      } else {
        const QRInfo = await TeacherPaymentModal.findOne({ teacherId: id });
        if (QRInfo) {
          res.status(200).json({
            QRInfo,
          });
        } else {
          res.status(400).json({
            msg: "NotFound",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getEnrollmentsByStudent = async (req, res) => {
    const teacherId = req.user._id; // Assuming the teacher ID is passed in as a parameter
    try {
      const enrollments = await StudentEnroll.find({
        teacher: teacherId,
      }).populate("student");
      const students = enrollments.map((enrollment) => enrollment.student);
      res.status(200).json({ enrollments });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error" });
    }
  };

  static postQuiz = async (req, res) => {
    try {
      const id = req.user._id;
      req.body.postedBy = id;
      const quiz = new QuizModel(req.body);
      quiz.save((err) => {
        if (err) {
          return response.status(500).send("Failed to post Quiz ");
        }
        res.status(200).json({
          quiz,
          msg: "Quiz posted successfully.",
        });
      });
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static getQuiz = async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "No teacher found doesnt exit",
        });
      } else {
        const quiz = await QuizModel.find({ postedBy: id });

        if (quiz) {
          res.status(200).json({
            quiz,
          });
        } else {
          res.status(400).json({
            msg: "No Quiz Found from this teacher",
          });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static addTeacherRating = async (req, res) => {
    try {
      const { rating, teacher, ratedBy } = req.body;
      if (rating && teacher && ratedBy) {
        const existingRate = await RatingModel.findOne({ ratedBy: ratedBy });

        if (existingRate) {
          return res.status(400).json({
            msg: "The rating for the student already exists",
          });
        }

        StudentEnroll.findOneAndUpdate(
          {
            teacher: teacher,
            student: ratedBy,
          },
          {
            hasRated: true,
          },
          (error, success) => {
            if (error) {
              res.status(400).json({
                status: "false",
                msg: "failed to update ",
              });
            } else {
              const rate = new RatingModel(req.body);
              rate.save((err) => {
                if (err) {
                  console.log(err);
                  return res.status(500).send("Failed to Rate ");
                }
                res.status(200).json({
                  rate,
                  msg: "Rate Added successfully.",
                });
              });
            }
          }
        );
      } else {
        res.status(400).json({
          msg: "All fields are required",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static postAssignment = async (req, res) => {
    try {
      const { title, deadlineDate, description } = req.body;
      const assignedBy = req.user._id;
      if (title && deadlineDate && description) {
        const document = new AssignmentModal({
          title: title,
          deadlineDate: deadlineDate,
          assignedBy: assignedBy,
          description: description,
        });

        document.save((err, success) => {
          if (err) {
            res.status(500).json({
              msg: "Failed to save document",
            });
          } else {
            res.status(200).json({
              assignment: document,
              msg: "Assignment Posted Successfully.",
            });
          }
        });
      } else {
        res.status(400).json({
          msg: "Fields are missing",
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static updateAssignment = async (req, res) => {
    try {
      const { id } = req.params;
      const { title, deadlineDate } = req.body;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "Invalid Id",
        });
      } else {
        const updated = await AssignmentModal.findByIdAndUpdate(
          { _id: id },
          {
            title: title,
            deadlineDate: deadlineDate,
          },
          (err, success) => {
            if (err) {
              res.status(400).json({
                msg: "Failed to update",
              });
            } else {
              res.status(200).json({
                document: updated,
                msg: "Assignment Updated Successfully",
              });
            }
          }
        );
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static removeAssignment = async (req, res) => {
    try {
      const { id } = req.params;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "Invalid Id",
        });
      } else {
        await AssignmentModal.findByIdAndDelete(id, (err, success) => {
          if (err) {
            res.status(400).json({
              msg: "Failed to delete",
            });
          } else {
            res.status(200).json({
              document: updated,
              msg: "Assignment removed Successfully",
            });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  };

  static getMyStudents = async (req, res) => {
    const teacher = req.user._id;
    try {
      const studentList = await StudentEnroll.find({
        teacher: teacher,
        paymentStatus: true,
      }).populate("student", "-password");
      if (studentList) {
        res.status(200).json({
          studentList,
        });
      } else {
        res.status(400).json({
          msg: "NO STUDENT FOUND",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  };

  static getMyStudentsCount = async (req, res) => {
    const teacher = req.user._id;
    try {
      const studentList = await StudentEnroll.find({
        teacher: teacher,
        paymentStatus: true,
      }).countDocuments();
      res.status(200).json({
        students: studentList,
      });
    } catch (error) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  };

  static getMyNewStudentsCount = async (req, res) => {
    const teacher = req.user._id;
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    try {
      const studentList = await StudentEnroll.find({
        teacher: teacher,
        paymentStatus: true,
        enrollDate: { $gte: oneWeekAgo },
      }).countDocuments();

      res.status(200).json({
        students: studentList,
      });
    } catch (error) {
      res.status(500).json({
        msg: "internal server error",
      });
    }
  };

  static getAssignmentByTeacher = async (req, res) => {
    try {
      const { id } = req.params;
      const assignment = await AssignmentModal.find({
        assignedBy: id,
      });
      if (assignment) {
        res.status(200).json({
          assignment,
        });
      } else {
        res.status(400).json({
          msg: "No Assignments Found",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  };

  static getMyStudentAssignments = async (req, res) => {
    try {
      const teacherId = req.user._id;
      const assignments = await AssignmentModal.find({ assignedBy: teacherId });
      const studentAssignments = await StudentAssignment.find({
        assignment: { $in: assignments.map((a) => a._id) },
      }).populate("submittedBy assignment", "-profilePic -password");
      res.status(200).json({ assignments: studentAssignments });
    } catch (error) {
      res.status(500).json({
        msg: "Internal Server Error",
      });
    }
  };

  static GetMyRating = async (req, res) => {
    try {
      const teacherId = req.user._id;
      const averageRating = await RatingModel.aggregate([
        { $match: { teacher: teacherId } },
        { $group: { _id: null, averageRating: { $avg: "$rating" } } },
      ]);
      if (averageRating.length === 0) {
        return res.status(200).json({ averageRating: 0 });
      }
      res.status(200).json({ averageRating: averageRating[0].averageRating });
    } catch (error) {
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };

  static GetStudentProgress = async (req, res) => {
    try {
      const teacherId = req.user._id;
      // Retrieve all assignments assigned by the teacher
      const assignments = await AssignmentModal.find({ assignedBy: teacherId });
      if (!assignments || assignments.length === 0) {
        return res
          .status(404)
          .json({ msg: "No assignments found for the teacher" });
      }
      const totalStudentUnderTeacher = await StudentEnroll.find({
        teacher: teacherId,
        paymentStatus: true,
      }).countDocuments();

      const assignmentsWithPercentage = [];
      for (const assignment of assignments) {
        const assignmentId = assignment._id.toString();

        // Count the number of submissions for the assignment
        const submissionCount = await StudentAssignment.countDocuments({
          assignment: assignmentId,
        });

        // Calculate the submission percentage
        const totalStudents = totalStudentUnderTeacher;
        const submissionPercentage = (submissionCount / totalStudents) * 100;

        const assignmentWithPercentage = {
          assignment,
          submissionPercentage,
        };

        assignmentsWithPercentage.push(assignmentWithPercentage);
      }

      res.json(assignmentsWithPercentage);
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ msg: "Internal Server Error" });
    }
  };
}

export default TeacherController;
