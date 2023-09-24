import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import BookIcon from "@mui/icons-material/Book";
import VerifiedIcon from "@mui/icons-material/Verified";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import GroupsIcon from "@mui/icons-material/Groups";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { blue, blueGrey } from "@mui/material/colors";

const listItemData = [
  { label: "Dashboard", link: "", icon: <DashboardIcon /> },
  { label: "Profile", link: "profile", icon: <AccountCircleIcon /> },
  { label: "Courses List", link: "CourseList", icon: <BookIcon /> },
  { label: "Verify Teacher", link: "VerifyTeacher", icon: <VerifiedIcon /> },
  { label: "Add Teachers", link: "Teachers", icon: <AccountCircleIcon /> },
  { label: "Add Students", link: "Students", icon: <GroupsIcon /> },
];

export const SideBarData = () => {
  const navigate = useNavigate();
  return (
    <List>
      {listItemData.map((item, i) => (
        <ListItem key={i}>
          <ListItemButton
            sx={{
              color: blueGrey["A700"],
              "& :hover, & :hover div": {
                color: blue["A400"],
              },
              "& div": {
                color: blueGrey["A700"],
              },
            }}
            onClick={() => navigate(item.link)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.label}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
};
