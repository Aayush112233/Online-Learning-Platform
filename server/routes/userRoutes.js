import express from "express";
import UserController from "../controllers/userController.js";
import Logged from "../controllers/GetLoggedInController.js";
import checkAuthUser from "../middlewares/user.auth.middleware.js";
import TeacherController from "../controllers/TeacherController.js";
import { handleFileUpload, upload } from "../middlewares/FileUpload.js";
import TeacherDocument from "../models/Teacher.js";
import ContactUS from "../controllers/contactIsController.js";
const router = express.Router();

//public route Send Reset Password Email
router.post(
  "/SendResetPasswordEmail",
  UserController.sendUserPasswordResetEmail
);
router.post("/resetpassword/:id/:token", UserController.userPasswordReset);

//public Router(without login)
router.post("/register", UserController.userRegistration);
router.post("/login", UserController.userLogin);
router.post(
  "/changePassword/:id",
  checkAuthUser,
  UserController.changePassword
);

//for teacher upload filr
router.post(
  "/teacher-documents",
  upload.fields([{name: 'document'}, {name: 'qrPhoto'}]),
  checkAuthUser,
  handleFileUpload,
  (request, response) => {
    response.send("Document uploaded successfully");
  }
);

router.get(
  "/teacher-documents/:id/download",
  TeacherController.GetTeacherDocumentByID
);

//get all (/)
router.get("/", checkAuthUser, UserController.GetallUsers);
router.get("/getAllStudentCount", checkAuthUser, UserController.getAllStudentCount);
router.get("/getAllTeacherCount", checkAuthUser, UserController.getAllTeacherCount);
router.get("/getAllNewStudentCount", checkAuthUser, UserController.getNewStudentCount);
router.get("/getStudentEnroll", checkAuthUser, UserController.getStudentEnroll);
router.get("/monthlyEnrollment", checkAuthUser, UserController.getMonthlyEnrollment);

router.get("/loggedInUser", checkAuthUser, Logged.loggedInUser);

//get all (/:id)
router.get("/allUser", checkAuthUser, UserController.GetallUsers);

router.get("/:id", UserController.GetallUsersById);

//route level middleware
router.post("/changePassword", checkAuthUser);
//Protected Router(register)

//update
router.put("/update/:id", UserController.UpdateUser);

//delete
router.delete("/delete/:id", checkAuthUser, UserController.DeleteUser);

router.put("/setavatar/:id", upload.single("image"), UserController.setAvatar); 
router.post("/contactUs", ContactUS.GetContactInfo); 
export default router;
