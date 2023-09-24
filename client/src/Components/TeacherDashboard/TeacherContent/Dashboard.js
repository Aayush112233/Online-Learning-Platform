import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import totalstudent from "../totalstudent.jpg";
import recentlyjoined from "../recentlyjoined.jpg";
import teacherrating from "../teacherrating.jpg";
import { useEffect } from "react";
import { API } from "../../../BaseURLProvider";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [myStudent, setMyStudent] = React.useState(0);
  const [myNewStudent, setMyNewStudent] = React.useState(0);
  const [myAverageRating, setMyAverageRating] = React.useState(0);
  const [studentList, setStudentList] = React.useState([]);
  const [studentProgress, setStudentProgress] = React.useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    API.get("/teacher/getMyStudentCount")
      .then((res) => {
        setMyStudent(res.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
    API.get("/teacher/getMyNewStudentCount")
      .then((res) => {
        setMyNewStudent(res.data.students);
      })
      .catch((err) => {
        console.log(err);
      });
    API.get("/teacher/getMyRating")
      .then((res) => {
        setMyAverageRating(res.data.averageRating);
      })
      .catch((err) => {
        console.log(err);
      });
    API.get("/teacher/getStudentProgress")
      .then((res) => {
        setStudentProgress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    getAllPayment();
  }, []);
  const getAllPayment = () => {
    API.get(`/teacher/getPaymentsofStudent`)
      .then((res) => {
        const filtered = res.data.enrollments.filter((item) => {
          return item.paymentStatus == false;
        });
        setStudentList(filtered);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const dateConversion = (dateTime) => {
    if (dateTime) {
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
    }
  };
  console.log("THE ITEMS", studentList);
  return (
    <Box sx={{ position: "relative" }}>
      <Grid container>
        <Grid item xs={12} sm={12}>
          <Typography sx={{ color: "grey", fontWeight: "bold" }} variant="h5">
            DASHBOARD
          </Typography>
        </Grid>
      </Grid>

      <Grid>
        <Grid sx={{ minHeight: "122px" }} container spacing={1} mt={1}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: "100%" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      src={totalstudent}
                      style={{
                        maxWidth: "100%",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} textAlign={"end"}>
                    <Typography component={"h5"} fontWeight={"bold"}>
                      My Students
                    </Typography>
                    <Typography component={"body2"} color={"grey"}>
                      {myStudent}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: "100%" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      src={recentlyjoined}
                      style={{
                        maxWidth: "100%",
                        mixBlendMode: "multiply",
                        height: "65px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} textAlign={"end"}>
                    <Typography component={"h5"} fontWeight={"bold"}>
                      Recently Joined Student
                    </Typography>
                    <Typography component={"body2"} color={"grey"}>
                      {myNewStudent}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ minHeight: "100%" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      src={teacherrating}
                      style={{
                        maxWidth: "100%",
                        mixBlendMode: "multiply",
                        height: "65px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} textAlign={"end"}>
                    <Typography component={"h5"} fontWeight={"bold"}>
                      Avergae Rating
                    </Typography>
                    <Typography component={"body2"} color={"grey"}>
                      {myAverageRating}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>

      <Grid>
        <Grid container spacing={2} mt={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">Pending Invoices</Typography>
              </CardContent>
              <CardContent>
                <Grid container>
                  {studentList.length > 0 ? (
                    studentList.map((item) => (
                      <Grid item xs={12}>
                        <Paper
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "1rem",
                              alignItems: "center",
                            }}
                          >
                            <Avatar src={item.student.profilePic}></Avatar>
                            <Typography>
                              {item.student.firstName +
                                " " +
                                item.student.lastName}
                            </Typography>
                          </div>

                          <Button
                            variant="contained"
                            onClick={() => {
                              navigate("/teacher/PaymentVerification");
                            }}
                          >
                            View
                          </Button>
                        </Paper>
                      </Grid>
                    ))
                  ) : (
                    <Typography textAlign={"center"}>
                      No Pending Request
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h5">
                  Assignment Submission Progress
                </Typography>
              </CardContent>
              <CardContent>
                <Grid container>
                  {studentProgress.length > 0 ? (
                    studentProgress.map((item) => {
                      console.log(item)
                      return (
                        <>
                          <Grid item xs={12}>
                            <Typography variant="h6" fontWeight={"bold"}>
                              {item.assignment?.title}
                            </Typography>
                            <Typography color={"GrayText"} marginBottom={2}>
                              Deadline : {dateConversion(item.assignment?.deadlineDate)}
                            </Typography>
                            <LinearProgress variant="determinate" value={item.submissionPercentage} />
                          </Grid>
                        </>
                      );
                    })
                  ) : (
                    <Typography textAlign={"center"}>
                      No Assignment given.
                    </Typography>
                  )}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
