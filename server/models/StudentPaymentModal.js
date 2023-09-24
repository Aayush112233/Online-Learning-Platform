import mongoose from "mongoose";

const StudentPaymentSchema = mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  teacherId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  paymentImage:{
    type: String,
    required: true,
  }
});

const StudentPaymentModal = mongoose.model(
  "student_payment",
  StudentPaymentSchema
);

export default StudentPaymentModal;