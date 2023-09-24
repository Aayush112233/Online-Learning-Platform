import {
  Avatar,
  Box,
  Button,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";
import { removeCookies } from "../../configurations/systemUtillies";
import { useNavigate } from "react-router-dom";
import { Context } from "../../Context/ContextConfig";

export const ProfileBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [avatar, setAvatar] = useState("");
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user, update } = useContext(Context);

  useEffect(() => {
    setAvatar(user?.profilePic);
  }, [user]);

  const dropDownData = [{ label: "Logout", icons: <LogoutIcon /> }];
  return (
    <>
      <Box>
        <Avatar
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          src={avatar}
          sx={{ width: "40px", height: "40px", cursor: "pointer" }}
        ></Avatar>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem
            onClick={() => {
              removeCookies("token");
              navigate("/login");
              window.location.reload();
            }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText>Log Out</ListItemText>
          </MenuItem>
        </Menu>
      </Box>
    </>
  );
};
