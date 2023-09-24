import mongoose from "mongoose";

//defifing schema for user
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    sex: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    role: {
      type: String,
      required: true,
      enum: ["teacher", "student", "admin"],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },

    dob: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },
    profilePic: {
      type: String,
      default:
        "https://hanifmedical.com/wp-content/uploads/2020/11/no-avatar-png-transparent-png-download-for-free-3856300-trzcacak-png-avatar-920_954.jpg",
    },
  },
  {
    timestamps: true,
  }
);

//Model
const UserModel = mongoose.model("user", userSchema);

export default UserModel;
