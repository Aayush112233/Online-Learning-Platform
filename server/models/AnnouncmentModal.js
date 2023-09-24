import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  post: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    require: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

//Model
const AnnouncementModal = mongoose.model("announcements", announcementSchema);

export default AnnouncementModal;
