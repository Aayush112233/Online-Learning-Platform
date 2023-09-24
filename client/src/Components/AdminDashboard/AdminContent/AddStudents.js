import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormValidation from "../../../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const AddStudents = ({ refreshTable }) => {
  const {
    register: studentForm,
    handleSubmit: studentSubmit,
    formState: { errors: studentError },
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidation.StudentValidation),
  });
  const [isStudent, setStudents] = useState(false);
  const handleStudentSubmit = (data) => {
    const addStudent = {
      ...data,
      confirmPassword: data.password,
      role: "student",
    };
    axios
      .post("http://localhost:9005/api/user/register", addStudent)
      .then((res) => {
        toast.success(res.data.msg);
        refreshTable();
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!studentError.firstName}
            label="First Name"
            {...studentForm("firstName")}
            helperText={
              studentError.firstName ? studentError.firstName.message : ""
            }
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!studentError.lastName}
            label="Last Name"
            {...studentForm("lastName")}
            helperText={
              studentError.lastName ? studentError.lastName.message : ""
            }
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-number"
            error={!!studentError.email}
            label="Email"
            {...studentForm("email")}
            helperText={studentError.email ? studentError.email.message : ""}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!studentError.password}
            label="Password"
            {...studentForm("password")}
            helperText={
              studentError.password ? studentError.password.message : ""
            }
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!studentError.dob}
            label="Date of Birth"
            type={"date"}
            {...studentForm("dob")}
            helperText={studentError.dob ? studentError.dob.message : ""}
            InputLabelProps={{
              shrink: true,
            }}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!studentError.phoneNo}
            label="Phone Number"
            {...studentForm("phoneNo")}
            helperText={
              studentError.phoneNo ? studentError.phoneNo.message : ""
            }
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            id="filled-basic"
            label="Gender"
            {...studentForm("sex")}
            variant="filled"
            fullWidth
            defaultValue={"male"}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Button
            sx={{ minWidth: "120px" }}
            variant="contained"
            onClick={studentSubmit(handleStudentSubmit)}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddStudents;
