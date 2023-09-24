import React, { useState } from "react";
import SideBar from "./SideBar";
import Dashboard from "../StudentDashboard/StudentContent/Dashboard";
import ViewYourCourse from "../StudentDashboard/StudentContent/YourCourse";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/system";
import StudentNavBar from "./StudentNavbar";
import AllCourses from "../StudentDashboard/StudentContent/AllCourses";
import Chat from "../../Reusables/Chat";
import Profile from "../../Reusables/profile";
import { Toolbar } from "@mui/material";
import ViewCourse from "./StudentContent/ViewCourse";
const StudentIndex = () => {
  const [mobileOpen, setmobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setmobileOpen(!mobileOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <StudentNavBar
        mobileOpen={mobileOpen}
        handleDrawerOpen={handleDrawerOpen}
      />
      <Box
        sx={{
          display: {
            sm: "flex",
          },
        }}
      >
        <SideBar mobileOpen={mobileOpen} handleDrawerOpen={handleDrawerOpen} />
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, height: "100vh", background: "#efefef" }}
        >
          <Toolbar />
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="AllCourses" element={<AllCourses />} />
            <Route path="ViewYourCourse" element={<ViewYourCourse />} />
            <Route path="ProfileInfo" element={<Profile />} />
            <Route path="Chat" element={<Chat />} />
            <Route path="view/:id?" element={<ViewCourse />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default StudentIndex;
