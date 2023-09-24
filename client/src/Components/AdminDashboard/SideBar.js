import { Box, Drawer } from "@mui/material";
import React from "react";
import { SideBarData } from "./SideBarData";

const SideBar = ({ mobileOpen, handleDrawerOpen }) => {
  return (
    <Box
      component="nav"
      sx={{
        minWidth: "250px",
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
        <SideBarData />
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { marginTop: "65px", minWidth: "250px" },
        }}
        open
      >
        <SideBarData />
      </Drawer>
    </Box>
  );
};

export default SideBar;
