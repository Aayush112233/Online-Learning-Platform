import React, { useState } from "react";
import AdminNavBar from "./AdminNavBar";
import SideBar from "./SideBar";
import Dashboard from "../AdminDashboard/AdminContent/Dashboard.js";
import CourseList from "../AdminDashboard/AdminContent/CourseList.js";
import VerifyTeacher from "../AdminDashboard/AdminContent/VerifyTeacher.js";
import Students from "../AdminDashboard/AdminContent/Students.js";
import Teachers from "../AdminDashboard/AdminContent/Teachers.js";
import Profile from "../../Reusables/profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Box } from "@mui/system";

const AdminIndex = () => {
  const [mobileOpen, setmobileOpen] = useState(false);
  const handleDrawerOpen = () => {
    setmobileOpen(!mobileOpen);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <AdminNavBar
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
          <Routes>
            <Route path="" element={<Dashboard />} />
            <Route path="CourseList" element={<CourseList />} />
            <Route path="VerifyTeacher" element={<VerifyTeacher />} />
            <Route path="Students" element={<Students />} />
            <Route path="Teachers" element={<Teachers />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Box>
      </Box>
    </div>
  );
};

export default AdminIndex;
