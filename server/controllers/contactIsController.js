import ContactUs from "../models/ContactUSModal.js";
import transproter from "../config/emailConfig.js";
class ContactUS {
  static GetContactInfo = async (req, res, next) => {
    const { firstName, lastName, email, phone, message } = req.body;
    if (firstName && lastName && email && phone && message) {
      const contact = new ContactUs(req.body);
      contact.save(async function (err, doc) {
        if (err) {
          next({ status: 500, message: "Cannot Save the contact." });
        } else {
          const text = `Dear ${firstName + " " + lastName},
    
                Thank you for contacting us. We appreciate your interest in our products and services.
                
                We have received your message and we will get back to you as soon as possible. 
                            
                Thank you again for reaching out to us.
                
                Best regards,
                
                Neelomasi - Your Learning Platform`;

          const userMessage = `Dear Admin, You have received an email from ${
            firstName + " " + lastName
          } saying that ${message}`;
          await transproter.sendMail({
            from: process.env.EMAIL_FROM,
            to: email,
            subject: "Contact",
            text: text,
          });

          await transproter.sendMail({
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_FROM,
            subject: "Contact",
            text: userMessage,
          });
        }

        res.status(200).json({
          message: "Message Sent Successfully",
        });
      });
    } else {
      next({ status: 400, message: "All fields are required" });
    }
  };
}
export default ContactUS;
