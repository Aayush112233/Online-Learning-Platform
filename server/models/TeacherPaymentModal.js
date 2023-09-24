import mongoose from "mongoose";

const TeacherPaymentSchema = mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  qrImage:{
    type: String,
    required: true,
  }
});

const TeacherPaymentModal = mongoose.model(
  "teacher_payment",
  TeacherPaymentSchema
);

export default TeacherPaymentModal;