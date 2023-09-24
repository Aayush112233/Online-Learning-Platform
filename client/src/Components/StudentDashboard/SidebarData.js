import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import VisibilityIcon from "@mui/icons-material/Visibility";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

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
  { label: "Your Profile", link: "ProfileInfo", icon: <AccountCircleIcon /> },
  {
    label: "All Courses",
    link: "AllCourses",
    icon: <AutoStoriesIcon />,
  },
  {
    label: "View Your Course",
    link: "ViewYourCourse",
    icon: <VisibilityIcon />,
  },
  { label: "Chat", link: "Chat", icon: <QuestionAnswerIcon /> },
];

export const SidebarData = () => {
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
