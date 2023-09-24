import express from "express";
import TeacherController from "../controllers/TeacherController.js";
import checkAuthUser from "../middlewares/user.auth.middleware.js";
import { upload } from "../middlewares/FileUpload.js";

const router = express.Router();

//teacher
router.get("/getAllDocuments", checkAuthUser, TeacherController.GetDocument);
router.get(
  "/getDocumentByTeacher",
  checkAuthUser,
  TeacherController.GetDocumentByTeacher
);
router.put("/changeStatus/:id", checkAuthUser, TeacherController.ChangeStatus);
router.put(
  "/changeQR",
  checkAuthUser,
  upload.single("qrImage"),
  TeacherController.ChangeQR
);
router.get("/getAllDetails", checkAuthUser, TeacherController.getAllForTeacher);
router.get(
  "/getAnnouncements/:id",
  checkAuthUser,
  TeacherController.getAnnouncementByTeacher
);
router.get("/getQuiz/:id", checkAuthUser, TeacherController.getQuiz);
router.post("/postQuiz", checkAuthUser, TeacherController.postQuiz);
router.post(
  "/postAnnouncements",
  checkAuthUser,
  TeacherController.PostAnnouncement
);
router.put(
  "/updateAnnouncements/:id",
  checkAuthUser,
  TeacherController.EditAnnouncement
);
router.get(
  "/findApprovedTeacherInfoByCourseId/:id",
  TeacherController.getApprovedTeachersByCourseId
);
router.get(
  "/getPaymentsofStudent",
  checkAuthUser,
  TeacherController.getEnrollmentsByStudent
);
router.post('/rating', checkAuthUser, TeacherController.addTeacherRating)
// router.get('/rating/id', checkAuthUser, TeacherController.getTeacherRatingById)

router.post("/postAssignments", checkAuthUser, TeacherController.postAssignment)
router.put("/updateAssignments/:id", checkAuthUser, TeacherController.updateAssignment)
router.delete("/deleteAssignments/:id", checkAuthUser, TeacherController.removeAssignment)
router.get("/getAllAssignments/:id", checkAuthUser, TeacherController.getAssignmentByTeacher)
router.get("/getMyStudent", checkAuthUser, TeacherController.getMyStudents)
router.get("/getMyStudentCount", checkAuthUser, TeacherController.getMyStudentsCount)
router.get("/getMyNewStudentCount", checkAuthUser, TeacherController.getMyNewStudentsCount)
router.get("/getMyStudentAssignments", checkAuthUser, TeacherController.getMyStudentAssignments)
router.get("/getMyRating", checkAuthUser, TeacherController.GetMyRating)
router.get("/getStudentProgress", checkAuthUser, TeacherController.GetStudentProgress)
router.get(
  "/getPaymentImageByTeacher/:id",
  TeacherController.getPaymentImageByTeacher
);
router.get(
  "/student-documents/:id/download",
  TeacherController.GetStudentDocumentByID
);
router.delete(
  "/deleteAnnouncements/:id",
  checkAuthUser,
  TeacherController.DeleteAnouncement
);

export default router;
