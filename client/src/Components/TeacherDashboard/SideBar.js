import { Box, Drawer } from "@mui/material";
import React from "react";
import { SidebarData } from "../TeacherDashboard/SidebarData";

const SideBar = ({ mobileOpen, handleDrawerOpen }) => {
  return (
    <Box
      component="nav"
      sx={{
        minWidth: "270px",
        marginTop: {
          sm: "65px",
          xs: 0,
        },
      }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerOpen}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            minWidth: "250px",
          },
        }}
      >
        <SidebarData />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { marginTop: "65px", minWidth: "250px" },
        }}
        open
      >
        <SidebarData />
      </Drawer>
    </Box>
  );
};

export default SideBar;
