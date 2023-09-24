import React from "react";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import AssignmentTwoToneIcon from "@mui/icons-material/AssignmentTwoTone";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import VerifiedTwoToneIcon from "@mui/icons-material/VerifiedTwoTone";
import QuizIcon from "@mui/icons-material/Quiz";
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
  {
    label: "Payment Verification",
    link: "PaymentVerification",
    icon: <VerifiedTwoToneIcon />,
  },
  { label: "Profile", link: "profile", icon: <AccountCircleIcon /> },
  { label: "My Course", link: "MyCourses", icon: <AutoStoriesIcon /> },
  {
    label: "Student Assignments",
    link: "StudentAssignments",
    icon: <AssignmentTwoToneIcon />,
  },
  { label: "Quiz", link: "Quiz", icon: <QuizIcon /> },
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
