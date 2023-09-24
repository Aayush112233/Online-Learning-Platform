import mongoose from "mongoose";

const RatingSchema = mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    ratedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const RatingModel = mongoose.model("rating", RatingSchema);

export default RatingModel;
