import express from "express";
import checkAuthUser from "../middlewares/user.auth.middleware.js";
import { handleFileUpload, upload } from "../middlewares/FileUpload.js";
import StudentController from "../controllers/studentController.js";

const router = express.Router();

router.post(
  "/enroll",
  checkAuthUser,
  upload.single("payment"),
  StudentController.studentEnroll
);
router.get(
  "/getCourses",
  checkAuthUser,
  StudentController.getUnenrolledCourses
);
router.get(
  "/getEnrolledCourses",
  checkAuthUser,
  StudentController.getEnrolledCourses
);
router.put(
  "/updateVerify/:id",
  checkAuthUser,
  StudentController.updateStudentStatus
);
router.get(
  "/getEnrollmentDetails/:id",
  checkAuthUser,
  StudentController.GetEnrollmentDetails
);
router.get("/getMyNotices", checkAuthUser, StudentController.GetMyNotices);
router.get(
  "/getMyAssignment",
  checkAuthUser,
  StudentController.GetMyAssignments
);
router.get("/getMyQuizzes", checkAuthUser, StudentController.GetMyQuizzes);
router.post(
  "/student-assignment",
  upload.single("document"),
  checkAuthUser,
  StudentController.SubmitAssignment
);

export default router;
