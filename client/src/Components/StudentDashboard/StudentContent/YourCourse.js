import React, { useEffect, useState } from "react";
import { API } from "../../../BaseURLProvider";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const YourCourse = () => {
  const [allCourses, setCourses] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getAllCourses();
  }, []);

  const getAllCourses = () => {
    API.get("/student/getEnrolledCourses")
      .then((res) => {
        setCourses(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log("the all courses", allCourses);

  return (
    <>
      <Box sx={{ w: 1, h: 1, position: "relative" }}>
        <Grid container spacing={2}>
          {allCourses?.map((course) => (
            <Grid key={course._id} item xs={12} md={4} lg={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    sx={{ fontSize: 20 }}
                    color="text.secondary"
                    gutterBottom
                  >
                    {course.course?.courseName +
                      "- " +
                      course.course?.courseCode}
                  </Typography>

                  <Typography>{course.course?.courseDescription}</Typography>
                </CardContent>
                <CardActions>
                  {course.paymentStatus ? (
                    <Button
                      size="small"
                      onClick={() => {
                        navigate(`/student/view/${course.teacher}`);
                      }}
                    >
                      View
                    </Button>
                  ) : (
                    <Button disabled size="small">
                      Pending
                    </Button>
                  )}
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default YourCourse;
