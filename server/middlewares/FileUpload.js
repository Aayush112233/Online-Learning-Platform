import multer from "multer";
import TeacherDocument from "../models/Teacher.js";
import mongoose from "mongoose";
import TeacherPaymentModal from "../models/TeacherPaymentModal.js";
const storage = multer.memoryStorage();
export const upload = multer({ storage: storage });

export const handleFileUpload = (request, response, next) => {
  console.log("The request", request);
  const { _id } = request.user;
  if (!mongoose.Types.ObjectId.isValid(request.body.course)) {
    return response.status(400).send("Invalid course ID");
  }
  const document = new TeacherDocument({
    userId: _id,
    document: {
      data: request.files.document[0].buffer,
      contentType: request.files.document[0].mimetype,
    },
    course: mongoose.Types.ObjectId(request.body.course),
  });

  const imageBuffer = request.files.qrPhoto[0].buffer;

  const base64Image = `data:${request.files.qrPhoto[0].mimetype};base64,${imageBuffer.toString(
    "base64"
  )}`;

  const image = new TeacherPaymentModal({
    teacherId: _id,
    qrImage: base64Image,
  });

  document.save((err) => {
    if (err) {
      return response.status(500).send("Failed to save document");
    }
    image.save((err)=>{
      if (err) {
        return response.status(500).send("Failed to save document");
      }
      else{
        response.status(200).json({
          msg:"Teacher Document Uploaded Successfully"
        })
      }
    });
  });
};
