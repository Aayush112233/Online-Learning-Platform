import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  CardContent,
} from "@mui/material";
import Navbar from "../Components/Navbar";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const sendmail = () => {
    const data = {
      email: email,
    };
    axios
      .post("http://localhost:9005/api/user/SendResetPasswordEmail", data)
      .then((res) => {
        toast.success(res.data.msg);
        setEmail("");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
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
          alignItems: "center",
        }}
      >
        <Navbar />

        <Grid
          container
          sx={{
            height: "75vh",

            width: {
              md: "70%",
              sm: "80%",
              xs: "90%",
            },
          }}
        >
          <Grid item xs={12}></Grid>
          <Grid
            item
            sx={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              gap: "2rem",
              display: "flex",
              flexDirection: "column",
            }}
            xs={12}
            md={3}
          >
            <Typography sx={{ fontWeight: "bold" }} variant="h4">
              Forgot Password
            </Typography>
            <TextField
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="outlined-basic"
              label="Email"
              fullWidth
            />
            <Button variant="contained" onClick={sendmail}>
              Send Mail
            </Button>
          </Grid>

          <Grid
            item
            sx={{
              // backgroundColor: "blue",
              display: {
                lg: "block",
                xs: "none",
              },
            }}
            xs={12}
            md={9}
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
                src="https://i.pinimg.com/736x/76/38/69/763869a33c8ac9e99a59500992c11127.jpg"
                alt="Image7"
                style={{
                  maxWidth: "100%",
                  // marginBottom: "1rem",
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

export default ForgetPassword;
