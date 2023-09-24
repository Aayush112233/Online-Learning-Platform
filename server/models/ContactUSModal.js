import mongoose, { Schema } from "mongoose";

const contact = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactUs = mongoose.model("contactus", contact);

export default ContactUs;
