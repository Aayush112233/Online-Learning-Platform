import { Upload } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Modal,
  Rating,
  Typography,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API } from "../../../BaseURLProvider";
import { Context } from "../../../Context/ContextConfig";
import { toast } from "react-toastify";
import SubmitAssignments from "./SubmitAssignments";

const CardStyle = {
  minHeight: "100%",
  padding: "15px",
  textAlign: "center",
};
const useStyles = styled((theme) => ({
  card: {
    marginBottom: theme.spacing(2),
  },
}));

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
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  border: "2px solid #efeff2",
  borderRadius: "16px",
  boxShadow: 24,
  gap: "1rem",
  p: 4,
};
const ViewCourse = () => {
  const classes = useStyles();
  const [announcements, setAnnouncements] = useState([]);
  const [quiz, setQuiz] = useState([]);
  const [value, setValue] = React.useState(0);
  const [hasRated, setHasRated] = useState(true);
  const [assignment, setAssignments] = useState([]);
  const [submitAssignment, setSubmitAssignment] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [selectedAssignment, setSelectedAssignment] = useState({});
  const [rateOpen, setRateOpen] = useState(false);
  const params = useParams();
  const teacherId = params.id;
  const { user, update } = React.useContext(Context);
  useEffect(() => {
    GetAnnouncement(teacherId);
    getQuiz(teacherId);
    GetEnrollmentDetails(teacherId);
    getAllAssignment(teacherId);
  }, [teacherId]);

  const GetAnnouncement = (id) => {
    API.get("/teacher/getAnnouncements/" + id)
      .then((res) => {
        setAnnouncements(res.data.announcements);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllAssignment = (id) => {
    API.get(`/teacher/getAllAssignments/${id}`)
      .then((res) => {
        setAssignments(res.data.assignment);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetEnrollmentDetails = (id) => {
    API.get(`/student/getEnrollmentDetails/${id}`)
      .then((res) => {
        console.log("the res", res.data.EnrollmentDetails);
        const filteredData = res.data.EnrollmentDetails;
        RateVerification(filteredData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const RateVerification = (filteredData) => {
    const today = new Date();
    const filteredEnrollments = filteredData.filter((enrollment) => {
      const enrollDate = new Date(enrollment.enrollDate);
      const diffInMonths =
        (today.getFullYear() - enrollDate.getFullYear()) * 12 +
        (today.getMonth() - enrollDate.getMonth());
      return diffInMonths >= 1 && enrollment.hasRated === false;
    });

    if (filteredEnrollments.length > 0) {
      setRateOpen(true);
    }
  };
  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  console.log(user);
  const getQuiz = (id) => {
    API.get(`/teacher/getQuiz/${id}`)
      .then((res) => {
        setQuiz(res.data.quiz);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRate = () => {
    const data = {
      rating: value,
      teacher: teacherId,
      ratedBy: currentUser._id,
    };

    API.post("/teacher/rating", data)
      .then((res) => {
        toast.success("Rating Added Successfully");
        setRateOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const selectedSubmit = (data) => {
    setSelectedAssignment(data);
    setSubmitAssignment(true);
  };

  return (
    <Box
      sx={{
        minHeight: "85vh",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Card
            sx={{
              height: "85vh",
              overflow: "auto",
              textAlign: "center",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <CardContent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <Typography sx={{ fontWeight: "bold" }} variant="h5">
                  Quiz
                </Typography>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5692/5692030.png"
                  style={{ height: "auto", width: "40%" }}
                ></img>
              </div>

              <Divider
                sx={{ position: "relative", backgroundColor: "textGray" }}
              ></Divider>
              {quiz?.map((item) => (
                <Grid item xs={12}>
                  <Card
                    sx={{
                      boxShadow:
                        "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset",
                    }}
                  >
                    <CardContent sx={{ textAlign: "start" }}>
                      <Typography variant="h6" sx={{ marginY: "10px" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2">
                        {item.description}
                      </Typography>
                      <Button
                        onClick={() => {
                          window.open(item.link);
                        }}
                        sx={{ mt: 1 }}
                        variant="outlined"
                      >
                        Play
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </CardContent>
          </Card>
          <Divider />
        </Grid>

        <Grid item xs={12} md={5}>
          <Card sx={{ height: "85vh", overflow: "auto", textAlign: "center" }}>
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                Notices
              </Typography>
              <Divider
                sx={{ position: "relative", backgroundColor: "textGray" }}
              ></Divider>
              <>
                {announcements?.map((item) => (
                  <Grid item xs={12} sx={{ my: 2 }}>
                    <Card
                      className={classes.card}
                      sx={{
                        display: "flex",
                        padding: "10px",
                        flexDirection: "column",
                        justifyContent: "start",
                        alignItems: "start",
                        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                      }}
                    >
                      <Grid container>
                        <Grid
                          item
                          xs={12}
                          justifyContent={"start"}
                          display={"flex"}
                        >
                          <Chip
                            variant="outlined"
                            sx={{ ml: "5px" }}
                            label={`Posted On: ${dateConversion(item.date)}`}
                            color="primary"
                          />
                        </Grid>
                      </Grid>

                      <CardContent>
                        <Typography variant="h6" mb={2} textAlign={"start"}>
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body1"
                          color="textSecondary"
                          component="p"
                          sx={{ textAlign: "start" }}
                        >
                          <p>{item.post}</p>
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card
            sx={{
              height: "85vh",
              overflow: "auto",
              textAlign: "center",
              boxShadow:
                "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px",
            }}
          >
            <CardContent>
              <Typography sx={{ fontWeight: "bold" }} variant="h5">
                Assignment
              </Typography>
              <Divider
                sx={{ position: "relative", backgroundColor: "textGray" }}
              ></Divider>
              <Grid
                className="scrollDiv"
                container
                mt={1}
                spacing={2}
                sx={{ maxHeight: "60vh", overflow: "auto" }}
              >
                {assignment?.map((item) => {
                  const deadline = new Date(item.deadlineDate).getTime(); // convert deadline date to milliseconds
                  const currentTime = new Date().getTime(); // get current time in milliseconds
                  const isDeadlinePassed = deadline < currentTime; // check if deadline has passed

                  return (
                    <Grid item xs={12}>
                      <Alert icon={false}>
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <Typography fontWeight={"bold"}>
                              {item.title}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              component="p"
                              sx={{ textAlign: "start" }}
                            >
                              Published On : {dateConversion(item.assignedDate)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Typography
                              variant="body1"
                              color="textSecondary"
                              component="p"
                              sx={{ textAlign: "start" }}
                            >
                              Deadline : {dateConversion(item.deadlineDate)}
                            </Typography>
                          </Grid>
                          <Grid item xs={12}>
                            <Button
                              variant="outlined"
                              disabled={isDeadlinePassed}
                              onClick={() => {
                                selectedSubmit(item);
                              }}
                            >
                              Submit
                            </Button>
                          </Grid>
                        </Grid>
                      </Alert>
                    </Grid>
                  );
                })}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <SubmitAssignments
        setSubmitAssignment={setSubmitAssignment}
        submitAssignment={submitAssignment}
        selectedAssignment={selectedAssignment}
      />
      <Modal
        open={rateOpen}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
              component="legend"
            >
              Rate Your Teacher:
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Typography>
          </Box>
          <Button variant="outlined" onClick={handleRate}>
            Submit
          </Button>
        </Box>
      </Modal>
    </Box>
  );
};

export default ViewCourse;
