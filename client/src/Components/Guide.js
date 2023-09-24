import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import SelectTutor from "../assets/image/SelectTutor.png";
import SelectCourse from "../assets/image/SelectCourse.png";
import RateTutor from "../assets/image/RateTutor.png";

const Guide = () => {
  const CustomBox = styled(Box)(({ theme }) => ({
    width: "30%",
    [theme.breakpoints.down("md")]: {
      width: "85%",
    },
  }));

  const GuidesBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: " space-around",
    width: "70%",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },

    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  }));

  const GuideBox = styled(Box)(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: " space-between",
    paddingBottom: "10px",
    marginTop: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      margin: theme.spacing(2, 0, 2, 0),
    },
  }));

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: 6,
      }}
    >
      <div
        style={{
          width: "5%",
          height: "5px",
          backgroundColor: "#000339",
          marginTop: "0 auto",
        }}
      ></div>

      <Typography
        variant="h3"
        sx={{ fontSize: "35px", fontWeight: "bold", color: "#000339", my: 3 }}
      >
        How it works?
      </Typography>

      <CustomBox>
        <Typography
          variant="body2"
          sx={{
            fontSize: "16px",
            fontWeight: "500",
            color: "#546473",
            textAlign: "center",
          }}
        >
          Everything you need is sit home and learn - Anytime,Anywhere
        </Typography>
      </CustomBox>
      <GuidesBox>
        <GuideBox>
          <Card sx={{ maxWidth: "90%", minHeight: "100%" }}>
            <CardActionArea
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                height: "100%",
              }}
            >
              <CardMedia component="img" image={SelectTutor} alt="img1" />
              <CardContent>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  gutterBottom
                  variant="h7"
                  component="div"
                >
                  Select Teacher
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There are many tutors for particular subject among them
                  Students can select teacher according to their related
                  subject.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GuideBox>

        <GuideBox>
          <Card sx={{ maxWidth: "90%", minHeight: "100%" }}>
            <CardActionArea>
              <CardMedia component="img" image={SelectCourse} alt="img2" />
              <CardContent>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  gutterBottom
                  variant="h7"
                  component="div"
                >
                  Join Course
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  There are various type of course available in this
                  application. Student can join this courses easily.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GuideBox>

        <GuideBox>
          <Card sx={{ maxWidth: "90%", minHeight: "100%" }}>
            <CardActionArea>
              <CardMedia component="img" image={RateTutor} alt="img3" />
              <CardContent>
                <Typography
                  sx={{ fontWeight: "bold" }}
                  gutterBottom
                  variant="h7"
                  component="div"
                >
                  Rate Tutor
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Students can give rating to teacher according how teacher had
                  teached them so that new joined student can choose best tutor
                  for them.
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </GuideBox>
      </GuidesBox>
    </Box>
  );
};

export default Guide;
