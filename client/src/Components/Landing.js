import { Box, styled, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import CustomButton from "./CustomButton";
import landingImg1 from "../assets/image/landingImg1.png";
import Guide from "./Guide";
import { API } from "../BaseURLProvider";
import { AuthenticationCheck } from "../configurations/systemUtillies";
import { Navigate } from "react-router-dom";
import { Context } from "../Context/ContextConfig";

const Landing = () => {
  const features = useRef();
  const [user, setUser] = useState();
  const home = useRef();
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
  const Title = styled(Typography)(({ theme }) => ({
    fontSize: "64px",
    color: "#000336",
    fontWeight: "bold",
    margin: theme.spacing(4, 0, 4, 0),
    [theme.breakpoints.down("sm")]: {
      fontSize: "40px",
    },
  }));

  const ScrollPage = (elementRef) => {
    if (elementRef) {
      if (elementRef === "features") {
        features.current?.scrollIntoView({ behaviour: "smooth" });
      }
      if (elementRef === "home") {
        home.current?.scrollIntoView({ behaviour: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (AuthenticationCheck()) {
      API.get("/user/loggedInUser")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch((err) => {
          if (err) {
            return <Navigate to="/login" />;
          }
        });
    }
  }, []);

  const { Updatestatus } = useContext(Context);

  return (
    <Box ref={home} sx={{ backgroundColor: "#E6F0FF", minHeight: "100vh" }}>
      <Container>
        <Navbar scroll={ScrollPage} user={user} />
        <CustomBox>
          <Box sx={{ flex: "1.75" }}>
            <Typography
              variant="body2"
              sx={{
                fontSize: "18px",
                color: "#687690",
                fontWeight: "500",

                mb: 4,
              }}
            >
              Welcome to Personal Coaching App
            </Typography>
            <Title variant="h1">Education is a never-ending source.</Title>
            <Typography
              variant="body2"
              sx={{ fontSize: "18px", color: "#5A6473", my: 4 }}
            >
              The true purpose of education is to make minds, not carrer
            </Typography>
            <CustomButton
              backgroundColor="#0F184C"
              color="#fff"
              buttonText="More About Us"
              heroBtn={true}
            ></CustomButton>
          </Box>

          <Box sx={{ flex: "1.75" }}>
            <img
              src={landingImg1}
              alt="Image1"
              style={{
                maxWidth: "100%",
                marginBottom: "3rem",
                mixBlendMode: "multiply",
              }}
            />
          </Box>
        </CustomBox>
      </Container>
      <div ref={features}>
        <Guide />
      </div>
    </Box>
  );
};

export default Landing;
