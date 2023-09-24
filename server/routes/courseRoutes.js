import express from "express";
import CourseController from "../controllers/coursesController.js";
import { upload } from "../middlewares/FileUpload.js";
import checkAuthUser from "../middlewares/user.auth.middleware.js";
import UserController from "../controllers/userController.js";

const router = express.Router();

//Add course
router.post("/addCourse", upload.single("courseImage"), CourseController.AddCourse);
router.get("/getAllCoursesCount", checkAuthUser, UserController.getAllCoursesCount);

router.get("/:id", CourseController.GetallCourseById);

//get all course
router.get("/", CourseController.GetallCourse);

//Add edit
router.put("/editCourse/:id", upload.single("courseImage"), CourseController.UpdateCourse);

//Add Delete
router.delete("/delete/:id", CourseController.DeleteCourse);

export default router;
