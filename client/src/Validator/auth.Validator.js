import { object, string, number, ref } from "yup";

class FormValidation {
  static RegisterValidation = object({
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
    email: string().email().required("email is required"),
    password: string()
      .required("password is required")
      .min(8, "password must be 8 length"),

    confirmPassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("password"), null], "Confirm Password does not match"),
    dob: string()
      .required("date of birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    phoneNo: string().required("A phone number is required"),
  });

  static LoginValidator = object({
    email: string().email().required("email is required"),
    password: string().required("password is required"),
  });

  static CourseListValidator = object({
    courseName: string().required("Course Name is required"),
    courseCode: string().required("Course Code is required"),
    courseDuration: number().integer().required("Course Duration is required"),
    coursePrice: number()
      .integer()
      .min(0, "Course Price must be a positive number"),
    courseDescription: string().max(
      300,
      "Course Description cannot exceed 300 characters"
    ),
  });

  static TeacherValidation = object({
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
    email: string().email().required("email is required"),
    password: string()
      .required("password is required")
      .min(8, "password must be 8 length"),
    dob: string()
      .required("date of birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    phoneNo: string().required("A phone number is required"),
  });

  static EditTeacherValidation = object({
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
    email: string().email().required("email is required"),
    dob: string()
      .required("date of birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    phoneNo: string().required("A phone number is required"),
  });

  static StudentValidation = object({
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
    email: string().email().required("email is required"),
    password: string()
      .required("password is required")
      .min(8, "password must be 8 length"),
    dob: string()
      .required("date of birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    phoneNo: string().required("A phone number is required"),
  });

  static EditStudentValidation = object({
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
    email: string().email().required("email is required"),
    dob: string()
      .required("date of birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    phoneNo: string().required("A phone number is required"),
  });

  static ResetValidation = object({
    newPassword: string()
      .required("password is required")
      .min(8, "password must be 8 length"),

    confirmPassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("newPassword"), null], "Confirm Password does not match"),
  });

  static UpdateProfile = object({
    firstName: string().required("first name is required"),
    lastName: string().required("last name is required"),
    email: string().email().required("email is required"),
    dob: string()
      .required("date of birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
    phoneNo: string().required("A phone number is required"),
  });

  static ProfileResetPassword = object({
    oldPassword: string().required("Old password is required"),

    newPassword: string()
      .required("New password is required")
      .min(8, "password must be 8 length"),

    confirmPassword: string()
      .required("Confirm Password is required")
      .oneOf([ref("newPassword"), null], "Confirm Password does not match"),
  });

  static Announcement = object({
    title: string().required("Title is required"),
    post: string().required("Mention something in your announcement."),
  });

  static QuiztValidator = object({
    title: string().required("Title is required"),
    link: string()
      .required("Link is required")
      .matches(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
        "Link must be a valid URL"
      ),
    description: string().required("Course Description is required"),
  });
  static AssignmentValidation = object({
    title: string().required("Title is required"),
    description: string().required("Course Description is required"),
    deadlineDate: string()
      .required("date of birth is required")
      .matches(
        /^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/,
        "Date of Birth must be a valid date in the format YYYY-MM-DD"
      ),
  });
}

export default FormValidation;
