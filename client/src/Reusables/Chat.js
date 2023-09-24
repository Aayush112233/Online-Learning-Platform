import { Grid } from "@mui/material";
import React, { useEffect, useState, useRef } from "react";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import { API } from "../BaseURLProvider";
import ChatContainer from "../Components/ChatComponent/ChatContainer";
import Contact from "../Components/ChatComponent/contact";

const Chat = () => {
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    API.get("/user/loggedInUser")
      .then((res) => {
        setCurrentUser(res.data.user);
        console.log(res);
      })
      .catch((err) => {
        console.log("The err", err);
      });
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io("http://localhost:9005");
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentUser) {
      API.get(`/user/allUser`)
        .then((res) => {
          setContacts(res.data.user);
          setCurrentChat(res.data.user[0]);
        })
        .catch((err) => {
          toast(err.response.data.msg);
        });
    }
  }, [currentUser]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <>
      <Grid>
        <Grid container mt={1} maxHeight={"85vh"}>
          <Grid item xs={12} md={3} maxHeight={"85vh"} overflow={"auto"}>
            <Contact
              contacts={contacts}
              changeChat={handleChatChange}
              currentUser={currentUser}
              setCurrentChat={setCurrentChat}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <ChatContainer
              currentChat={currentChat}
              socket={socket}
              currentUser={currentUser}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Chat;
