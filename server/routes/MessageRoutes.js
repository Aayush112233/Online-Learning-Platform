import express from "express";
import MessageChannelController from "../controllers/MessageController.js";
const router = express.Router();

router.post("/addmsg", MessageChannelController.addMessage);
router.post("/getmsg", MessageChannelController.getMessages);

export default router;
