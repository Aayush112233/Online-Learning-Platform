import React, { useEffect, useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { API } from "../../../BaseURLProvider";
const SelectionForm = ({ displayCourse, setValue, Payment, setTeacher }) => {
  const [teachers, setTeachers] = useState([]);
  const [rate, setRate] = useState(0);
  const [selectedTeacher, setSelectedTeachers] = useState("");
  useEffect(() => {
    API.get(`/teacher/findApprovedTeacherInfoByCourseId/${displayCourse._id}`)
      .then((res) => {
        console.log(res);
        setTeachers(res.data.teachers);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [displayCourse]);

  const handleSelectChange = (e) => {
    const teacher = e.target.value;
    setSelectedTeachers(teacher);
    setTeacher(teacher);
  };

  return (
    <>
      <Typography
        sx={{
          fontWeight: "bold",
          fontFamily: "sans-serif",
          textAlign: "center",
        }}
        id="modal-modal-title"
        variant="h6"
        component="h2"
      >
        Course Selected
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontWeight: "bold",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            Course Name:
            <Typography>{displayCourse && displayCourse.courseName}</Typography>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontWeight: "bold",
              display: "flex",
              gap: "0.5rem",
            }}
          >
            Course Code:
            <Typography>{displayCourse && displayCourse.courseCode}</Typography>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontWeight: "bold",
              display: "flex",
              gap: "0.25rem",
            }}
          >
            Course Duration:
            <Typography>
              {displayCourse &&
                displayCourse.courseDuration + " " + " " + "months"}
            </Typography>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontWeight: "bold",
              display: "flex",
              gap: "0.25rem",
            }}
          >
            Course Price:
            <Typography>
              {displayCourse && displayCourse.coursePrice + " " + " " + "NPR"}
            </Typography>
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{
              mt: 2,
              fontWeight: "bold",
              display: "flex",
              gap: "0.25rem",
              minWidth: "30vw",
            }}
          >
            Course description:
            <Typography>
              {displayCourse && displayCourse.courseDescription}
            </Typography>
          </Typography>
        </Grid>
        <Grid item xs={6} md={6}>
          <FormControl
            sx={{
              mt: 4,
              minWidth: 200,
              size: "small",
            }}
          >
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={selectedTeacher}
              onChange={handleSelectChange}
              helperText="Please select your teacher"
            >
              <MenuItem value="" sx={{ textAlign: "center" }}>
                Select your teacher
              </MenuItem>
              {teachers?.map((option) => (
                <MenuItem
                  key={option.userId._id}
                  value={option.userId._id}
                  selected
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography>
                    {option.userId.firstName +
                      " " +
                      option.userId.lastName +
                      "  "}
                  </Typography>
                  <Rating name="read-only" value={option.rating} readOnly />
                </MenuItem>
              ))}
            </TextField>
          </FormControl>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            textAlign: "end",
            justifyContent: "end",
            display: "flex",
            w: 1,
          }}
        >
          <Button
            variant="contained"
            onClick={() => {
              setValue(1);
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default SelectionForm;
