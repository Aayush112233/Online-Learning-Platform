import React, { useState, useRef } from "react";
import {
  Box,
  styled,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { Container } from "@mui/system";
import Contact from "../assets/image/Contact.png";
import Navbar from "./Navbar";
import axios from "axios";
import { toast } from "react-toastify";

const ContactForm = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "center",
    gap: theme.spacing(5),
    marginTop: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
      alignItem: "center",
      textAlign: "center",
    },
  }));

  const firstNameRef = useRef(null);
  const lastNameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const messageRef = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page
    // Access the form data from the refs
    const formData = {
      firstName: firstNameRef.current.value,
      lastName: lastNameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      message: messageRef.current.value,
    };
    // Perform further processing or send the data to an API
    axios
      .post("http://localhost:9005/api/user/contactUs", formData)
      .then((res) => {
        toast.success(res.data.msg);
        event.target.reset();

      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });

    // Reset the form after submission
  };

  return (
    <Box
      style={{
        backgroundColor: "#E6F0FF",
        mixBlendMode: "multiply",
        overFlow: "hidden",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <Typography
        style={{
          textAlign: "center",
          fontSize: "50px",
          fontWeight: "bold",
        }}
      >
        Contact Us
      </Typography>
      <Container>
        <CustomBox>
          <Box sx={{ flex: "1.75" }}>
            <img
              src={Contact}
              alt="Image5"
              style={{
                maxWidth: "100%",
                mixBlendMode: "multiply",
              }}
            />
          </Box>
          <Box sx={{ flex: "1.75" }}>
            <Typography>
              <Card
                style={{
                  maxWidth: 450,
                  margin: "0 auto",
                  Padding: "20px 5px",
                  backgroundColor: "#F5F5F5",
                }}
              >
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <Grid container spacing="1rem">
                      <Grid xs={12} md={6} item>
                        <TextField
                          id="outlined-basic"
                          label="Enter First Name"
                          variant="outlined"
                          fullWidth
                          required
                          inputRef={firstNameRef}
                        />
                      </Grid>
                      <Grid xs={12} md={6} item>
                        <TextField
                          id="outlined-basic"
                          label="Enter Last Name"
                          variant="outlined"
                          fullWidth
                          required
                          inputRef={lastNameRef}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <TextField
                          id="outlined-basic"
                          label="Enter Email"
                          variant="outlined"
                          fullWidth
                          required
                          inputRef={emailRef}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <TextField
                          id="outlined-basic"
                          label="Enter phone"
                          variant="outlined"
                          fullWidth
                          required
                          inputRef={phoneRef}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <TextField
                          id="outlined-multiline-static"
                          label="Message"
                          multiline
                          rows={4}
                          defaultValue=""
                          fullWidth
                          required
                          inputRef={messageRef}
                        />
                      </Grid>
                      <Grid xs={12} item>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          fullWidth
                        >
                          Submit
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </CardContent>
              </Card>
            </Typography>
          </Box>
        </CustomBox>
      </Container>
    </Box>
  );
};
export default ContactForm;
