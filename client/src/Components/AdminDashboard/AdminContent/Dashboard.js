import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import { Card, CardContent, Typography } from "@mui/material";
import studentimage from "../../../assets/image/student.svg";
import studentsimage from "../../../assets/image/studentsimage.png";
import coursessimage from "../../../assets/image/coursesimage.png";
import teacherimage from "../../../assets/image/teacherimage.png";
import { API } from "../../../BaseURLProvider";
import "chart.js/auto";
import { Bar } from "react-chartjs-2";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJs,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from "chart.js";

ChartJs.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);
const Dashboard = () => {
  const [studentCount, setStudentCount] = React.useState(0);
  const [teacherCount, setTeacherCount] = React.useState(0);
  const [courseCount, setCourseCount] = React.useState(0);
  const [studentNewCount, setStudentNewCount] = React.useState(0);
  const [studentEnroll, setStudentEnroll] = React.useState();
  const [chartData, setChartData] = React.useState();
  const [enrollmentData, setEnrollmentData] = React.useState([]);

  React.useEffect(() => {
    getStudentCount();
    getTeacherCount();
    getCourseCount();
    getNewlyJoinedCount();
    getStudentEnroll();
    studentEnrollment();
  }, []);

  const getStudentCount = () => {
    API.get("/user/getAllStudentCount")
      .then((res) => {
        setStudentCount(res.data.studentCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStudentEnroll = () => {
    API.get("/user/getStudentEnroll")
      .then((res) => {
        setStudentEnroll(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTeacherCount = () => {
    API.get("/user/getAllTeacherCount")
      .then((res) => {
        setTeacherCount(res.data.teacherCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getCourseCount = () => {
    API.get("/course/getAllCoursesCount")
      .then((res) => {
        setCourseCount(res.data.courseCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const studentEnrollment = async () => {
    try {
      const response = await API.get("/user/monthlyEnrollment");
      const apiData = response.data;
      setEnrollmentData(apiData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getNewlyJoinedCount = () => {
    API.get("/user/getAllNewStudentCount")
      .then((res) => {
        setStudentNewCount(res.data.studentCount);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const config = {
    type: "bar",
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: "Student Enrollment in Each Course",
          fontSize: 20,
          font: {
            weight: "bold",
          },
        },
      },
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          beginAtZero: true,
          ticks: {
            precision: 0,
          },
        },
      },
      legend: {
        display: false,
      },
    },
  };

  React.useEffect(() => {
    if (studentEnroll) {
      preparebarGraph();
    }
  }, [studentEnroll]);

  const preparebarGraph = () => {
    const labels = studentEnroll.map((student) => student.courseName);
    const students = studentEnroll.map((student) => student.students);

    const chartData = {
      labels: labels,
      datasets: [
        {
          label: "Students",
          data: students,
          backgroundColor: [
            "rgba(75, 192, 192, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(75, 192, 192, 0.4)",
            "rgba(75, 192, 192, 0.4)",
          ],
          borderColor: [
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(75, 192, 192, 1)",
          ],
          borderWidth: 1,
        },
      ],
    };

    setChartData(chartData);
  };

  const labels = enrollmentData.map((item) => item.month);
  const counts = enrollmentData.map((item) => item.number);

  const lineData = {
    labels: labels,
    datasets: [
      {
        label: "Enrollment Count",
        data: counts,
        fill: false,
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

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
          <Grid item xs={6} sm={3}>
            <Card sx={{ minHeight: "100%" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      src={studentimage}
                      style={{
                        maxWidth: "100%",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} textAlign={"end"}>
                    <Typography component={"h5"} fontWeight={"bold"}>
                      New Student
                    </Typography>
                    <Typography component={"body2"} color={"grey"}>
                      {studentNewCount}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ minHeight: "100%" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      src={studentsimage}
                      style={{
                        maxWidth: "100%",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} textAlign={"end"}>
                    <Typography component={"h5"} fontWeight={"bold"}>
                      Total Students
                    </Typography>
                    <Typography component={"body2"} color={"grey"}>
                      {studentCount}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ minHeight: "100%" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      src={coursessimage}
                      style={{
                        maxWidth: "100%",
                        mixBlendMode: "multiply",
                        height: "65px",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} textAlign={"end"}>
                    <Typography component={"h5"} fontWeight={"bold"}>
                      Total Courses
                    </Typography>
                    <Typography component={"body2"} color={"grey"}>
                      {courseCount}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={6} sm={3}>
            <Card sx={{ minHeight: "100%" }}>
              <CardContent>
                <Grid container>
                  <Grid item xs={3}>
                    <img
                      src={teacherimage}
                      style={{
                        maxWidth: "100%",
                        mixBlendMode: "multiply",
                      }}
                    />
                  </Grid>
                  <Grid item xs={9} textAlign={"end"}>
                    <Typography component={"h5"} fontWeight={"bold"}>
                      Total Teachers
                    </Typography>
                    <Typography component={"body2"} color={"grey"}>
                      {teacherCount}
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
              <CardContent style={{ minHeight: "400px" }}>
                {chartData ? (
                  <Bar data={chartData} options={config.options} />
                ) : (
                  "loading..."
                )}
              </CardContent>
              <CardContent></CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent style={{ minHeight: "400px" }}>
                {chartData ? (
                  <Line  data={lineData} />
                ) : (
                  "loading..."
                )}
              </CardContent>
              <CardContent></CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
