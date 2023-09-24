import {
  Avatar,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext, useEffect, useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormValidation from "../Validator/auth.Validator";
import { API } from "../BaseURLProvider";
import { Context } from "../Context/ContextConfig";
import { PhotoCamera } from "@mui/icons-material";

const Profile = () => {
  const [id, setId] = useState("");
  const [ProfileImage, setProfileImage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewSource, setPreviewSource] = useState(null);
  const { user, update } = useContext(Context);
  useEffect(() => {
    if (user) {
      setId(user._id);
      setProfile("firstName", user.firstName);
      setProfile("lastName", user.lastName);
      setProfile("phoneNo", user.phoneNo);
      setProfile("dob", user.dob);
      setProfile("email", user.email);
      setProfileImage(user.profilePic);
    }
  }, [user]);
  const {
    register: ResetPasswordForm,
    handleSubmit: ResetPasswordSubmit,
    formState: { errors: ResetPasswordError },
    setValue: setReset,
  } = useForm({
    resolver: yupResolver(FormValidation.ProfileResetPassword),
  });
  const Reset = () => {
    setReset("oldPassword", "");
    setReset("newPassword", "");
    setReset("confirmPassword", "");
  };
  const ResetPassword = (data) => {
    const reset = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };
    API.post(`/user/changePassword/${id}`, reset)
      .then((res) => {
        toast.success("Your Password has been Changed Sucessfully");
        Reset();
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };
  const {
    register: UpdateProfileForm,
    handleSubmit: UpdateProfileSubmit,
    formState: { errors: UpdateProfileError },
    setValue: setProfile,
  } = useForm({
    resolver: yupResolver(FormValidation.UpdateProfile),
  });

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProfileImage(reader.result);
    };
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await API.put("user/setavatar/" + id, formData)
        .then((res) => {
          update(res.data.user);
        })
        .catch((err) => [console.log(err)]);

      setSelectedFile("");
      // do something with response data, e.g. update UI
    } catch (error) {
      console.log(error);
      // handle error, e.g. show error message to user
    }
  };
  const UpdateProfile = (data) => {
    API.put(`/user/update/${id}`, data)
      .then((res) => {
        toast.success(res.data.msg);
        setUserinContext()
      })
      .catch((err) => {
        toast.error(err.response.data.msg);
      });
  };

  const setUserinContext =() =>{
    API.get("/user/loggedInUser")
      .then((res) => {
        update(res.data.user);
      })
      .catch((err) => {
        console.log(err)
      });
  }
  return (
    <>
      <Box sx={{ height: "100%", padding: 4 }}>
        <Box
          sx={{
            backgroundColor: "white",
            width: {
              md: "80%",
              sm: "96%",
            },
            height: "100%",
            margin: "auto",
            overflow: "auto",
            px: {
              md: 5,
            },
          }}
        >
          <Grid container>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h4" color={"#61876E"}>
                  Edit Information
                </Typography>
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: {
                    md: "end",
                    xs: "center",
                  },
                  flexDirection: {
                    md: "row",
                    xs: "column",
                  },
                }}
              >
                <Avatar
                  alt="S"
                  src={ProfileImage}
                  style={{ height: "150px", width: "150px" }}
                ></Avatar>
                <div>
                  {selectedFile ? (
                    <div>
                      <Button variant="contained" onClick={handleUpload}>
                        {" "}
                        Save
                      </Button>
                    </div>
                  ) : (
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="label"
                    >
                      <input
                        hidden
                        accept="image/*"
                        type="file"
                        onChange={handleFileSelect}
                      />
                      <PhotoCamera />
                    </IconButton>
                  )}
                </div>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" color={"#61876E"}>
                      Account Information
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!UpdateProfileError.firstName}
                      label="Enter First Name"
                      {...UpdateProfileForm("firstName")}
                      helperText={
                        UpdateProfileError.firstName
                          ? UpdateProfileError.firstName.message
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!UpdateProfileError.lastName}
                      label="Enter Last Name"
                      {...UpdateProfileForm("lastName")}
                      helperText={
                        UpdateProfileError.lastName
                          ? UpdateProfileError.lastName.message
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!UpdateProfileError.phoneNo}
                      label="Enter Phone Number"
                      {...UpdateProfileForm("phoneNo")}
                      helperText={
                        UpdateProfileError.phoneNo
                          ? UpdateProfileError.phoneNo.message
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="date"
                      error={!!UpdateProfileError.dob}
                      type="date"
                      label="Enter DOB"
                      {...UpdateProfileForm("dob")}
                      helperText={
                        UpdateProfileError.dob
                          ? UpdateProfileError.dob.message
                          : ""
                      }
                      variant="outlined"
                      InputLabelProps={{
                        shrink: true,
                      }}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      label="Enter E-mail"
                      error={!!UpdateProfileError.email}
                      variant="outlined"
                      {...UpdateProfileForm("email")}
                      helperText={
                        UpdateProfileError.email
                          ? UpdateProfileError.email.message
                          : ""
                      }
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ justifyContent: "center", display: "flex" }}
                  >
                    <Button
                      variant="contained"
                      onClick={UpdateProfileSubmit(UpdateProfile)}
                    >
                      Update
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={6}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h4" color={"#61876E"}>
                      Change Password
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!ResetPasswordError.oldPassword}
                      label="Enter Current Password"
                      {...ResetPasswordForm("oldPassword")}
                      helperText={
                        ResetPasswordError.oldPassword
                          ? ResetPasswordError.oldPassword.message
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!ResetPasswordError.newPassword}
                      label="Enter New Password"
                      {...ResetPasswordForm("newPassword")}
                      helperText={
                        ResetPasswordError.newPassword
                          ? ResetPasswordError.newPassword.message
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!ResetPasswordError.confirmPassword}
                      label="Enter Confirm Password"
                      {...ResetPasswordForm("confirmPassword")}
                      helperText={
                        ResetPasswordError.confirmPassword
                          ? ResetPasswordError.confirmPassword.message
                          : ""
                      }
                      variant="outlined"
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sx={{ justifyContent: "center", display: "flex" }}
                  >
                    <Button
                      variant="contained"
                      onClick={ResetPasswordSubmit(ResetPassword)}
                    >
                      Change
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default Profile;
