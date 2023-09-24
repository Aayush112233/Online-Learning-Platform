import {
  Avatar,
  Box,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  Badge,
} from "@mui/material";
import React from "react";
import { NotificationsActive } from "@mui/icons-material";
import { useStyles } from "../TeacherDashboard/HeaderStyle";

export const Notification = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dropDownData = [
    { label: "happy", desc: "registration request" },
    { label: "lucy", desc: "registration request" },
    { label: "rex", desc: "registration request" },
  ];
  return (
    <Box>
      <IconButton
        variant="contained"
        id="Notification"
        aria-controls={open ? "Notification" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        color="inherit"
      >
        <Badge badgeContent={4} color="secondary">
          <NotificationsActive />
        </Badge>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <List sx={{ maxWidth: "300px", minWidth: "250px" }}>
          {dropDownData.map((item, i) => (
            <ListItem key={i} onClick={handleClose}>
              <ListItemIcon>
                <Avatar sx={{ backgroundColor: "blue", color: "white" }}>
                  {item.label[0].toLocaleUpperCase()}
                </Avatar>
              </ListItemIcon>
              <ListItemText
                primary={item.label}
                secondary={item.desc}
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </Menu>
    </Box>
  );
};
