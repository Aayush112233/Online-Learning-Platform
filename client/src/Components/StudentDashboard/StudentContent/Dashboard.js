import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import communication from "../communication.png";
import quiz from "../quiz.png";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import { Modal } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { API } from "../../../BaseURLProvider";
import "../../../assets/CSS/custom.css";
const Dashboard = () => {
  const navigate = useNavigate();
  const [studentAnnouncements, setStudentAnnouncements] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]);
  const [open, setOpen] = useState(false);
  const [quizzes, setQuizes] = useState([]);
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: {
      md: "70%",
      xs: "95%",
    },
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "space-between",
  }));

  const handleClose = () => {
    setOpen(false);
  };

  const dateConversion = (dateTime) => {
    const date = new Date(dateTime);
    const options = {
      weekday: "long",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    return formattedDate;
  };

  useEffect(() => {
    API.get("/student/getMyNotices")
      .then((res) => {
        setStudentAnnouncements(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    API.get("/student/getMyAssignment")
      .then((res) => {
        setMyAssignments(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    API.get("/student/getMyQuizzes")
      .then((res) => {
        console.log("THE QUEZZWES", res);
        setQuizes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Grid>
        <Grid sx={{ minHeight: "122px" }} container spacing={1} mt={1}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                minHeight: "100%",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Grid container>
                <Grid item xs={12} textAlign={"center"}>
                  <Typography component={"h6"} fontWeight={"bold"}>
                    Communication
                  </Typography>
                  <img
                    style={{
                      height: "200px",
                      width: "auto",
                    }}
                    src={communication}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"end"}>
                <Grid item>
                  <Button
                    variant="outlined"
                    onClick={() => {
                      navigate("/student/Chat");
                    }}
                  >
                    Join Chat
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                minHeight: "100%",
                justifyContent: "space-between",
                display: "flex",
                flexDirection: "column",
                padding: "10px",
              }}
            >
              <Grid container>
                <Grid item xs={12} textAlign={"center"}>
                  <Typography component={"h6"} fontWeight={"bold"}>
                    Join Quiz
                  </Typography>
                  <img
                    style={{
                      height: "200px",
                      width: "auto",
                    }}
                    src={quiz}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent={"end"}>
                <Grid item>
                  <Button variant="outlined" onClick={handleOpen}>
                    Lets Play
                  </Button>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        <Grid>
          <Grid container spacing={1} mt={1}>
            <Grid item xs={12} md={7}>
              <Card
                sx={{
                  minHeight: "55vh",
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Grid container>
                  <Grid item xs={12} textAlign={"center"}>
                    <Typography component={"h6"} fontWeight={"bold"}>
                      Notice and Announcements
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      {studentAnnouncements.map((item) => (
                        <ListItem
                          style={{
                            backgroundColor: "#0A4D68",
                            color: "white",
                            borderRadius: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          <ListItemText
                            primary={item.courseName}
                            secondary={item.post}
                            secondaryTypographyProps={{
                              sx: {
                                color: "#e6efff",
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card
                sx={{
                  minHeight: "55vh",
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "column",
                  padding: "10px",
                }}
              >
                <Grid container>
                  <Grid item xs={12} textAlign={"center"}>
                    <Typography component={"h6"} fontWeight={"bold"}>
                      My Assignments
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <List
                      sx={{
                        width: "100%",
                        bgcolor: "background.paper",
                      }}
                    >
                      {myAssignments.map((item) => (
                        <ListItem
                          style={{
                            backgroundColor: "#0A4D68",
                            color: "white",
                            borderRadius: "15px",
                            marginBottom: "10px",
                          }}
                        >
                          <ListItemText>
                            <Typography sx={{ fontSize: "20px" }}>
                              {item.courseName}
                            </Typography>
                            <Typography sx={{ fontSize: "15px" }}>
                              Deadline at : {dateConversion(item.deadlineDate)}
                            </Typography>
                            <Typography sx={{ fontSize: "15px" }}>
                              Assigned By: {item.teacherName}
                            </Typography>
                          </ListItemText>
                        </ListItem>
                      ))}
                    </List>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography variant="h6" id="quiz-modal-title" gutterBottom>
              Quizzes
            </Typography>
            <Stack spacing={2}>
              {quizzes.map((quiz) => (
                <div key={quiz._id} style={{ marginTop: 20 }}>
                  <Item>
                    <Grid container alignItems={"center"}>
                      <Grid item xs={9}>
                        <Typography
                          sx={{ fontSize: "25px", fontWeight: "bold" }}
                        >
                          {quiz.title} - {quiz.courseName}
                        </Typography>
                        <Typography>{quiz.description}</Typography>
                      </Grid>
                      <Grid item xs={3}>
                        <a
                          href={quiz.link}
                          class="button js-button"
                          role="button"
                        >
                          Start Playing
                        </a>
                      </Grid>
                    </Grid>
                  </Item>
                  <br />
                </div>
              ))}
            </Stack>
          </Box>
        </Modal>
      </Grid>
    </>
  );
};

export default Dashboard;
