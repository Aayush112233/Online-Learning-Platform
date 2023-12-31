import mongoose from "mongoose";

const connectDb = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "E-learning",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("connect sucessfully..");
  } catch (error) {
    console.log(error);
  }
};

export default connectDb;
