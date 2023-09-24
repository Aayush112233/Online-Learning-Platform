import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { API } from "../../BaseURLProvider";
import ChatInputField from "./ChatInputField";

const ChatContainer = ({ currentChat, socket, currentUser }) => {
  const [messages, setMessages] = useState([]);
  const scrollRef = useRef();
  const [arrivalMessage, setArrivalMessage] = useState(null);
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket.current]);

  useEffect(() => {
    if (currentChat) {
      API.post("/messages/getmsg", {
        from: currentUser._id,
        to: currentChat._id,
      })
        .then((res) => {
          setMessages(res.data);
        })
        .catch((err) => {
          console.log("The err", err);
        });
    }
  }, [currentChat]);

  const handleSendMsg = async (msg) => {
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    await API.post("/messages/addmsg", {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function makeLinksClickable(text) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    if (!text) {
      return "";
    }
    if (!text.match(urlRegex)) {
      return text;
    }
    return text.replace(urlRegex, '<a href="$1">$1</a>');
  }

  return (
    <>
      <Card
        sx={{
          minHeight: "85vh",
          justifyContent: "space-between",
          display: "flex",
          width: "100%",
          flexDirection: "column",
          padding: "10px",
        }}
      >
        <Grid container>
          <Grid item xs={12} textAlign={"center"}>
            <Typography component={"h6"} fontWeight={"bold"}>
              Conversation
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box maxHeight={"550px"} overflow="auto" sx={{ padding: "10px" }}>
              {messages.map((message) => {
                return (
                  <>
                    <Box ref={scrollRef} key={uuidv4()}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: message.fromSelf
                            ? "flex-end"
                            : "flex-start",
                        }}
                      >
                        {message.fromSelf ? null : <Avatar></Avatar>}

                        <Card
                          sx={{
                            padding: "10px",
                            marginBottom: "10px",
                            maxWidth: "30%",
                            borderRadius: "20px",
                            backgroundColor: message.fromSelf
                              ? "#0082ff"
                              : "#f5f5f5",
                            color: message.fromSelf ? "white" : "black",
                            marginRight: message.fromSelf ? "10px" : "0",
                            marginLeft: message.fromSelf ? "0" : "10px",
                            wordWrap: "break-word",
                          }}
                          dangerouslySetInnerHTML={{
                            __html: makeLinksClickable(message.message),
                          }}
                        ></Card>
                        {message.fromSelf ? (
                          <>
                            <Avatar></Avatar>
                          </>
                        ) : null}
                      </Box>
                    </Box>
                  </>
                );
              })}
            </Box>
          </Grid>
        </Grid>
        <Grid
          container
          sx={{ alignItems: "center", width: "100%", justifyContent: "center" }}
          spacing={3}
        >
          <ChatInputField handleSendMsg={handleSendMsg} />
        </Grid>
      </Card>
    </>
  );
};

export default ChatContainer;
