import { Avatar, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Contact = ({ contacts, changeChat, setCurrentChat }) => {
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(() => {
    if (contacts.length > 0) {
      changeCurrentChat(0, contacts[0]);
    }
  }, [contacts]);

  useEffect(() => {
    changeChat(contacts[0]);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      <Card
        sx={{
          minHeight: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "10px",
          gap: "2rem",
        }}
      >
        <Typography variant="h5" fontWeight={"bold"} textAlign="center">
          Chats
        </Typography>
        <Grid container spacing={3} display={"flex"} flexDirection={"column"}>
          {contacts
            ?.filter((item) => item.role !== "admin")
            .map((item, index) => {
              return (
                <>
                  <Grid item>
                    <Card
                      sx={{
                        maxHeight: "90px",
                        backgroundColor:
                          index == currentSelected ? "#fadef2" : "white",
                        boxShadow: "none",
                      }}
                      onClick={() => changeCurrentChat(index, item)}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          justifyContent: "start",
                          alignItems: "center",

                          gap: "1rem",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Avatar src={item.profilePic}></Avatar>
                        </div>

                        <div>
                          <Typography
                            sx={{ fontSize: "1rem", fontWeight: "bold" }}
                          >
                            {item.firstName + " " + item.lastName}
                          </Typography>
                        </div>
                      </CardContent>
                    </Card>
                  </Grid>
                </>
              );
            })}
        </Grid>
      </Card>
    </>
  );
};

export default Contact;
