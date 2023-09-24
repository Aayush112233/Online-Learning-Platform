import mongoose from "mongoose";

const pdfSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  document: {
    data: Buffer,
    contentType: String,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const PDF = mongoose.model("pdf_details", pdfSchema);

export default PDF;
