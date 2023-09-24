import multer from "multer";
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true); // corrected the typo here
    } else {
      cb(new Error("Only Image files are allowed"));
    }
  },
});

export default upload;
