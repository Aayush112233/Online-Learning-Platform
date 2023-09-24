import UserModel from "../models/User.js";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { json } from "express";
import transproter from "../config/emailConfig.js";
import ejs from "ejs";
import mongoose from "mongoose";
import CourseModel from "../models/Courses.js";
import StudentEnroll from "../models/StudentEnrollModal.js";
//USER REGISTER
class UserController {
  //user register
  static userRegistration = async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        sex,
        password,
        confirmPassword,
        dob,
        phoneNo,
        role,
      } = req.body;
      const user = await UserModel.findOne({
        $or: [{ email: email }, { phoneNo: phoneNo }],
      });
      if (user) {
        res.status(400).json({
          status: "false",
          msg: "This Emailand phone number is already Exists",
        });
      } else {
        if (
          firstName &&
          lastName &&
          email &&
          sex &&
          password &&
          confirmPassword &&
          dob &&
          phoneNo &&
          role
        ) {
          if (password === confirmPassword) {
            try {
              const salt = await bcrypt.genSalt(10);
              const hashPassword = await bcrypt.hash(password, salt);
              const doc = new UserModel({
                firstName: firstName,
                lastName: lastName,
                email: email,
                sex: sex,
                password: hashPassword,
                dob: dob,
                phoneNo: phoneNo,
                role: role,
              });
              await doc.save();
              res.status(200).json({
                status: "true",
                msg: "User Registered Sucessfully",
              });
            } catch (error) {
              res.status(400).json({
                status: "false",
                msg: "User unable to register",
              });
            }
          } else {
            res.json({
              status: "false",
              msg: "password and confirm password doesnot match",
            });
          }
        } else {
          res
            .status(400)
            .json({ status: "false", msg: "All fields are required" });
        }
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  //USER LOGIN
  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      if (email && password) {
        const user = await UserModel.findOne({ email: email });
        if (user != null) {
          const isMatch = await bcrypt.compare(password, user.password);
          if (user.email === email && isMatch) {
            //JWT TOKEN
            const token = jwt.sign(
              { useremail: user.email },
              process.env.JWT_SECRET_KEY,
              { expiresIn: "2d" }
            );
            res
              .status(200)
              .json({ status: "true", msg: "Login Success", token: token });
          } else {
            res.status(400).json({
              status: "false",
              msg: "Email or password doesnot match",
            });
          }
        } else {
          res
            .status(400)
            .json({ status: "false", msg: "You are not registed user" });
        }
      } else {
        res
          .status(400)
          .json({ status: "false", msg: "All fields are required" });
      }
    } catch (error) {
      res.status(400).json({ status: "false", msg: error });
    }
  };

  //change pw
  static changePassword = async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const id = req.params.id;
      const userDetail = await UserModel.findById(id);
      const isMatch = await bcrypt.compare(oldPassword, userDetail.password);
      if (userDetail == null) {
        return res.status(500).json({
          status: "false",
          msg: "Something went wrong",
        });
      }
      if (oldPassword && newPassword) {
        if (oldPassword === newPassword) {
          res.status(400).json({
            status: "false",
            msg: "New password cannot be same as your old password ",
          });
        } else {
          if (!isMatch) {
            res.status(400).json({
              status: "false",
              msg: "Old password didnt match ",
            });
          } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(newPassword, salt);
            UserModel.findByIdAndUpdate(
              { _id: id },
              { password: hashPassword },
              (error, success) => {
                if (error) {
                  res.status(400).json({
                    status: "false",
                    msg: "try again! failed to reset password",
                  });
                } else {
                  res.status(200).json({
                    status: "true",
                    msg: "Sucessfully reset password",
                  });
                }
              }
            );
          }
        }
      } else {
        res
          .status(400)
          .json({ status: "false", msg: "All fields are required" });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  // USER UPDATE
  static UpdateUser = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "User doesnt exit",
        });
      } else {
        UserModel.findByIdAndUpdate(
          { _id: id },
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            dob: req.body.dob,
            phoneNo: req.body.phoneNo,
          },
          (error, success) => {
            if (error) {
              res.status(400).json({
                status: "false",
                msg: "failed to update ",
              });
            } else {
              res
                .status(200)
                .json({ status: "true", msg: "Sucessfully Updated" });
            }
          }
        );
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  // DELETE USER
  static DeleteUser = async (req, res) => {
    try {
      const id = req.params.id;
      if (!ObjectId.isValid(id)) {
        res.status(500).json({
          status: "false",
          msg: "id doesnt exit",
        });
      } else {
        UserModel.findByIdAndDelete({ _id: id }, (error, success) => {
          if (error) {
            res.status(400).json({
              status: "false",
              msg: "failed to delete ",
            });
          } else {
            res
              .status(200)
              .json({ status: "true", msg: "Sucessfully deleted" });
          }
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  //Get all(/)
  static GetallUsers = async (req, res) => {
    try {
      const currentUser = mongoose.Types.ObjectId(req.user._id);
      const user = await UserModel.find({ _id: { $ne: currentUser } }).select(
        "-password"
      );
      if (user) {
        res.status(200).json({
          user,
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
  static GetallUsersById = async (req, res) => {
    try {
      const id = req.params.id;
      const User = await UserModel.find({ _id: id }).select("-password");
      if (User) {
        res.status(200).json({
          User,
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

  //forget password
  static sendUserPasswordResetEmail = async (req, res) => {
    try {
      const { email } = req.body;
      if (email) {
        const user = await UserModel.findOne({ email: email });

        if (user) {
          const secret = user._id + process.env.JWT_SECRET_KEY;
          const token = jwt.sign({ userID: user._id }, secret, {
            expiresIn: "15m",
          });
          const link = `http://localhost:3000/reset/${user._id}/${token}`;
          const html = await ejs.renderFile("./pages/Email.html", {
            link: link,
          });
          //send email
          let info = await transproter.sendMail({
            from: process.env.EMAIL_FROM,
            to: user.email,
            subject: "Password Rest Link",
            html: html,
          });

          res.status(200).json({
            msg: "Your reset passwoord is send in your email",
          });
        } else {
          res.status(400).json({
            msg: "email doenot exist",
          });
        }
      } else {
        res.status(400).json({
          msg: "All field is required ",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  //password reset
  static userPasswordReset = async (req, res) => {
    try {
      const { newPassword, confirmPassword } = req.body;
      const { id, token } = req.params;
      const user = await UserModel.findById(id);
      const new_secret = user._id + process.env.JWT_SECRET_KEY;
      try {
        jwt.verify(token, new_secret);
        if (newPassword && confirmPassword) {
          if (newPassword !== confirmPassword) {
            res.status(400).json({
              msg: "New password and Confirm Password doesnot match ",
            });
          } else {
            const salt = await bcrypt.genSalt(10);
            const newhashPassword = await bcrypt.hash(newPassword, salt);
            await UserModel.findByIdAndUpdate(user._id, {
              $set: { password: newhashPassword },
            });
            res.status(200).json({
              msg: "password reset sucessfully",
            });
          }
        } else {
          res.status(400).json({
            msg: "All field is required ",
          });
        }
      } catch (error) {
        res.status(400).json({
          msg: "Token Expired. Try Again!",
        });
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static setAvatar = async (req, res, next) => {
    try {
      const userId = req.params.id;
      const imageBuffer = req.file.buffer;
      const base64Image = `data:${
        req.file.mimetype
      };base64,${imageBuffer.toString("base64")}`;

      try {
        const user = await UserModel.findByIdAndUpdate(
          userId,
          { profilePic: base64Image },
          { new: true }
        );
        if (!user) {
          return res.status(404).send("User not found");
        }
        res.send({ user, profilePicUrl: base64Image });
      } catch (error) {
        next(error);
      }
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getAllStudentCount = async (req, res) => {
    try {
      const studentCount = await UserModel.find({
        role: "student",
      }).countDocuments();
      res.status(200).json({
        studentCount: studentCount,
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getAllTeacherCount = async (req, res) => {
    try {
      const teacherCount = await UserModel.find({
        role: "teacher",
      }).countDocuments();
      res.status(200).json({
        teacherCount: teacherCount,
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getAllCoursesCount = async (req, res) => {
    try {
      const courseCount = await CourseModel.find().countDocuments();
      res.status(200).json({
        courseCount: courseCount,
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getNewStudentCount = async (req, res) => {
    try {
      const currentDate = new Date();
      const lastMonthDate = new Date();
      lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
      const studentCount = await UserModel.find({
        role: "student",
        createdAt: { $gte: lastMonthDate, $lte: currentDate },
      }).countDocuments();
      res.status(200).json({
        studentCount: studentCount,
      });
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getMonthlyEnrollment = async (req, res) => {
    try {
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const enrollmentCounts = await StudentEnroll.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "courseInfo",
          },
        },
        {
          $match: {
            enrollDate: {
              $gte: new Date(`${currentYear}-01-01`),
              $lte: new Date(`${currentYear}-12-31`),
            },
          },
        },
        {
          $group: {
            _id: { $month: "$enrollDate" },
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            month: {
              $switch: {
                branches: [
                  { case: { $eq: ["$_id", 1] }, then: "January" },
                  { case: { $eq: ["$_id", 2] }, then: "February" },
                  { case: { $eq: ["$_id", 3] }, then: "March" },
                  { case: { $eq: ["$_id", 4] }, then: "April" },
                  { case: { $eq: ["$_id", 5] }, then: "May" },
                  { case: { $eq: ["$_id", 6] }, then: "June" },
                  { case: { $eq: ["$_id", 7] }, then: "July" },
                  { case: { $eq: ["$_id", 8] }, then: "August" },
                  { case: { $eq: ["$_id", 9] }, then: "September" },
                  { case: { $eq: ["$_id", 10] }, then: "October" },
                  { case: { $eq: ["$_id", 11] }, then: "November" },
                  { case: { $eq: ["$_id", 12] }, then: "December" },
                ],
                default: "Invalid Month",
              },
            },
            number: "$count",
          },
        },
      ]);

      res.status(200).json(enrollmentCounts);
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };

  static getStudentEnroll = async (req, res) => {
    try {
      const enrolledStudents = await StudentEnroll.aggregate([
        {
          $lookup: {
            from: "courses",
            localField: "course",
            foreignField: "_id",
            as: "courseDetails",
          },
        },
        {
          $match: {
            paymentStatus: true,
          },
        },
        {
          $group: {
            _id: "$course",
            courseName: {
              $first: { $arrayElemAt: ["$courseDetails.courseName", 0] },
            },
            students: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            courseName: 1,
            students: 1,
          },
        },
      ]);

      res.status(200).json(enrolledStudents);
    } catch (error) {
      res.status(500).json({ msg: "internal server error" });
    }
  };
}

export default UserController;
