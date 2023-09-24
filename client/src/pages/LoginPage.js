import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import FormValidation from "../Validator/auth.Validator";
import { yupResolver } from "@hookform/resolvers/yup";
import login from "../assets/image/loginRegister.jpg";
import MailLockTwoToneIcon from "@mui/icons-material/MailLockTwoTone";
import VpnKeyTwoToneIcon from "@mui/icons-material/VpnKeyTwoTone";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { grey, pink } from "@mui/material/colors";
import Navbar from "../Components/Navbar";
import { VerifyAdmin } from "../configurations/systemUtillies";
import { useLocation, useNavigate } from "react-router-dom";
import { API } from "../BaseURLProvider";
import { Context } from "../Context/ContextConfig";
function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { from } = location.state ? location.state : "";

  const {
    register: registerForm,
    handleSubmit: registerSubmit,
    formState: { errors: registerError },
  } = useForm({
    resolver: yupResolver(FormValidation.RegisterValidation),
  });

  const {
    register: loginForm,
    handleSubmit: loginSubmit,
    formState: { errors: loginError },
  } = useForm({
    resolver: yupResolver(FormValidation.LoginValidator),
  });

  const RegisterSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/register`, data)
      .then((res) => {
        toast.success(res.data.msg);
        setIsRegister(false);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };
  const onLoginSubmit = (data) => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/login`, data)
      .then((res) => {
        VerifyAdmin(res.data.token);
        toast.success(res.data.msg);

        setUserinContext();
        setIsRegister(false);
        if (from === undefined) {
          navigate("/");
        } else {
          navigate(from);
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const { user, update, status } = useContext(Context);
  const setUserinContext = () => {
    API.get("/user/loggedInUser")
      .then((res) => {
        update(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Navbar />
        <Grid
          container
          sx={{
            height: "85vh",
            width: {
              md: "70%",
              sm: "80%",
              xs: "90%",
            },
          }}
        >
          <Grid
            item
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
            lg={6}
          >
            {!isRegister? (
              <>
                <Grid
                  container
                  sx={{
                    minHeight: "60%",
                    width: {
                      md: "300px",
                      sm: "80%",
                      xs: "90%",
                    },
                    padding: 3,
                  }}
                >
                  <Grid item xs={12}>
                    <Typography fontSize={20} fontWeight="bold" align="center">
                      Welcome Back !
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!loginError.email}
                      label="Email"
                      {...loginForm("email")}
                      helperText={
                        loginError.email ? loginError.email.message : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <MailLockTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      id="outlined-basic"
                      error={!!loginError.password}
                      type="password"
                      label="Password"
                      {...loginForm("password")}
                      helperText={
                        loginError.password ? loginError.password.message : ""
                      }
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <VpnKeyTwoToneIcon />
                          </InputAdornment>
                        ),
                      }}
                      variant="outlined"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Typography fontSize={12} fontWeight="bold" align="end">
                      <a href="/forget-password"> Forgot Password?</a>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} justifyContent="center">
                    <Button
                      variant="contained"
                      onClick={loginSubmit(onLoginSubmit)}
                      fullWidth
                    >
                      Sign In
                    </Button>
                  </Grid>
                </Grid>
                <Typography color={"grey"} fontSize={12}>
                  Don't have an account yet?
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsRegister(true);
                    }}
                  >
                    Register Now
                  </span>
                </Typography>
              </>
            ) : null}
            {isRegister ? (
              <>
                <Grid
                  container
                  sx={{
                    minHeight: "70%",
                    width: {
                      md: "450px",
                      sm: "80%",
                      xs: "90%",
                    },
                    padding: 2,
                    m: 0,
                  }}
                >
                  <Grid
                    container
                    m={0}
                    maxHeight={1}
                    overflow={"auto"}
                    spacing={2}
                  >
                    <Grid item xs={12}>
                      <Typography
                        fontSize={22}
                        fontWeight="bold"
                        align="center"
                      >
                        Register a new Account
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="firstName"
                        id="outlined-basic"
                        error={!!registerError.firstName}
                        label="First Name"
                        {...registerForm("firstName")}
                        helperText={
                          registerError.firstName
                            ? registerError.firstName.message
                            : ""
                        }
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="lastName"
                        id="outlined-basic"
                        error={!!registerError.lastName}
                        label="Last Name"
                        {...registerForm("lastName")}
                        helperText={
                          registerError.lastName
                            ? registerError.lastName.message
                            : ""
                        }
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="phoneNo"
                        id="outlined-basic"
                        error={!!registerError.phoneNo}
                        label="phoneNo"
                        {...registerForm("phoneNo")}
                        helperText={
                          registerError.phoneNo
                            ? registerError.phoneNo.message
                            : ""
                        }
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="email"
                        id="outlined-basic"
                        error={!!registerError.email}
                        label="Email"
                        {...registerForm("email")}
                        helperText={
                          registerError.email ? registerError.email.message : ""
                        }
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        name="dob"
                        id="date"
                        type="date"
                        error={!!registerError.dob}
                        label="Date of Birth"
                        {...registerForm("dob")}
                        helperText={
                          registerError.dob ? registerError.dob.message : ""
                        }
                        fullWidth
                        size="small"
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Role
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="student"
                          name="radio-buttons-group"
                          size="small"
                        >
                          <FormControlLabel
                            value="student"
                            control={
                              <Radio
                                {...registerForm("role")}
                                size="20px"
                                sx={{
                                  m: 0,
                                }}
                              />
                            }
                            label="Student"
                          />
                          <FormControlLabel
                            value="teacher"
                            control={
                              <Radio
                                {...registerForm("role")}
                                size="20px"
                                sx={{
                                  m: 0,
                                }}
                              />
                            }
                            label="Teacher"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <FormControl>
                        <FormLabel id="demo-radio-buttons-group-label">
                          Gender
                        </FormLabel>
                        <RadioGroup
                          row
                          aria-labelledby="demo-radio-buttons-group-label"
                          defaultValue="female"
                          name="radio-buttons-group"
                          size="20px"
                        >
                          <FormControlLabel
                            value="female"
                            control={
                              <Radio
                                {...registerForm("sex")}
                                size="20px"
                                sx={{
                                  color: pink[800],
                                  "&.Mui-checked": {
                                    color: pink[600],
                                  },
                                }}
                              />
                            }
                            label="Female"
                          />
                          <FormControlLabel
                            value="male"
                            control={
                              <Radio {...registerForm("sex")} size="20px" />
                            }
                            label="Male"
                          />
                          <FormControlLabel
                            value="other"
                            control={
                              <Radio
                                {...registerForm("sex")}
                                size="20px"
                                sx={{
                                  color: grey[800],
                                  "&.Mui-checked": {
                                    color: grey[600],
                                  },
                                }}
                              />
                            }
                            label="Other"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="password"
                        id="outlined-basic"
                        error={!!registerError.password}
                        label="Password"
                        {...registerForm("password")}
                        helperText={
                          registerError.password
                            ? registerError.password.message
                            : ""
                        }
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        name="confirmPassword"
                        id="outlined-basic"
                        error={!!registerError.confirmPassword}
                        label="Confirm Password"
                        {...registerForm("confirmPassword")}
                        helperText={
                          registerError.confirmPassword
                            ? registerError.confirmPassword.message
                            : ""
                        }
                        variant="outlined"
                        fullWidth
                        size="small"
                      />
                    </Grid>

                    <Grid item xs={12} justifyContent="center">
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={registerSubmit(RegisterSubmit)}
                      >
                        Sign Up
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>

                <Typography color={"grey"} fontSize={12} mb={1}>
                  Already have an account?
                  <span
                    style={{
                      fontWeight: "bold",
                      color: "black",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setIsRegister(false);
                    }}
                  >
                    Sign In
                  </span>
                </Typography>
              </>
            ) : null}
          </Grid>

          <Grid
            item
            sx={{
              display: {
                lg: "block",
                xs: "none",
              },
            }}
            xs={12}
            lg={6}
          >
            <Grid
              container
              sx={{
                minHeight: 1,
                dispaly: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={login}
                alt="Image7"
                style={{
                  maxWidth: "100%",
                  mixBlendMode: "multiply",
                }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default LoginPage;
