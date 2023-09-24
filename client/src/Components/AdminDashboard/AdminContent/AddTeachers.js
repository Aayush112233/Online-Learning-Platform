import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormValidation from "../../../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";

const AddTeachers = ({ refreshTable }) => {
  const {
    register: teacherForm,
    handleSubmit: teacherSubmit,
    formState: { errors: teacherError },
    setValue,
  } = useForm({
    resolver: yupResolver(FormValidation.TeacherValidation),
  });
  const [isTeacher, setIsTeacher] = useState(false);
  const handleTeacherSubmit = (data) => {
    const addTeacher = {
      ...data,
      confirmPassword: data.password,
      role: "teacher",
    };
    axios
      .post("http://localhost:9005/api/user/register", addTeacher)
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
            error={!!teacherError.firstName}
            label="First Name"
            {...teacherForm("firstName")}
            helperText={
              teacherError.firstName ? teacherError.firstName.message : ""
            }
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!teacherError.lastName}
            label="Last Name"
            {...teacherForm("lastName")}
            helperText={
              teacherError.lastName ? teacherError.lastName.message : ""
            }
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-number"
            error={!!teacherError.email}
            label="Email"
            {...teacherForm("email")}
            helperText={teacherError.email ? teacherError.email.message : ""}
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!teacherError.password}
            label="Password"
            {...teacherForm("password")}
            helperText={
              teacherError.password ? teacherError.password.message : ""
            }
            variant="filled"
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            id="filled-basic"
            error={!!teacherError.dob}
            label="Date of Birth"
            type={"date"}
            {...teacherForm("dob")}
            helperText={teacherError.dob ? teacherError.dob.message : ""}
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
            error={!!teacherError.phoneNo}
            label="Phone Number"
            {...teacherForm("phoneNo")}
            helperText={
              teacherError.phoneNo ? teacherError.phoneNo.message : ""
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
            {...teacherForm("sex")}
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
            onClick={teacherSubmit(handleTeacherSubmit)}
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default AddTeachers;
