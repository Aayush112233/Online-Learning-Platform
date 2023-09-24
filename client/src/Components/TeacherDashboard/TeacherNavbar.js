import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useStyles } from "../TeacherDashboard/HeaderStyle";
import { ProfileBar } from "./profileBar";
import ListRoundedIcon from "@mui/icons-material/ListRounded";
import AppLogo from "../../assets/image/Applogo.png";
import styled from "@emotion/styled";

const TeacherNavbar = ({ handleDrawerOpen }) => {
  const classes = useStyles();
  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    width: "4.5rem",
    marginLeft: "3rem ",
    marginTop: "7px",
  }));

  return (
    <AppBar sx={{ backgroundColor: "#863A6F" }} position="static">
      <Toolbar className={classes.toolbar}>
        <Typography sx={{ flexGrow: 1 }} variant="h6" className={classes.logo}>
          <NavbarLogo src={AppLogo} alt="logo" />
        </Typography>
        <Box
          sx={{
            display: {
              sm: "flex",
              xs: "none",
            },
          }}
        >
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <ProfileBar />
          </Box>
        </Box>

        <Box
          sx={{
            display: {
              sm: "none",
              xs: "block",
            },
          }}
        >
          <IconButton onClick={handleDrawerOpen}>
            <ListRoundedIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default TeacherNavbar;
