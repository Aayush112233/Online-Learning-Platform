import {
  Button,
  Grid,
  outlinedInputClasses,
  TextField,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import InsertEmoticonIcon from "@mui/icons-material/InsertEmoticon";
import { IoMdSend } from "react-icons/io";
import Picker from "emoji-picker-react";
const ChatInputField = ({ handleSendMsg }) => {
  const [msg, setMsg] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleEmojiPickerhideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (event, emojiObject) => {
    let message = msg;
    message += emojiObject.emoji;
    setMsg(message);
  };

  const sendChat = (e) => {
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <>
      <Grid container spacing={3} justifyContent="center" alignItems={"center"}>
        <Grid item xs={8}>
          <TextField
            id="outlined-basic"
            label="Write a message"
            // variant="outlined"
            fullWidth
            value={msg}
            size="small"
            sx={{
              "&.MuiTextField-root": {
                border: "none",
                outline: "none",
              },
            }}
            onChange={(e) => {
              setMsg(e.target.value);
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            endIcon={<SendIcon />}
            sx={{
              borderRadius: "20px",
            }}
            onClick={(e) => {
              sendChat(e);
            }}
          >
            <Typography>Send</Typography>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default ChatInputField;
