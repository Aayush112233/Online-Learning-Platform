import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  styled,
  List,
  Drawer,
  ListItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Link,
  Button,
} from "@mui/material";
import Applogo from "../assets/image/Applogo.png";
import { Container } from "@mui/material";
import CustomButton from "./CustomButton";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaHome } from "react-icons/fa";
import { FaBookReader } from "react-icons/fa";
import { BsFillTelephoneFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { Context } from "../Context/ContextConfig";
import {
  AuthenticationCheck,
  removeCookies,
} from "../configurations/systemUtillies";
import { Update } from "@mui/icons-material";

export const NavItems = [
  {
    name: "Home",
  },
  {
    name: "Features",
  },
  {
    name: "Contact Us",
  },
];

const Navbar = ({ scroll, user }) => {
  const navigate = useNavigate();
  useEffect(() => {
    toggleDrawer("left", false);
  }, []);
  const [mobileMenu, setMobileMenu] = useState({
    left: false,
  });
  const [userDetails, setUserDetails] = useState(null);

  const UserInfo = useContext(Context);

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.type === "Tab" || event.type === "shift")
    ) {
      return;
    }
    setMobileMenu({ ...mobileMenu, [anchor]: open });
  };

  const { Updatestatus } = useContext(Context);
  const registerclick = () => {
    Updatestatus("register");
    navigate("/login");
  };

  const loginclick = () => {
    Updatestatus("login");
    navigate("/login");
  };
  const list = (anchor, data) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "button" ? "auto" : 250 }}
      role="presention"
      onClick={toggleDrawer(anchor, false)}
      onkeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem
          onClick={() => {
            navigate("/");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <FaHome />
            </ListItemIcon>
            <ListItemText primary={"Home"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem
          onClick={() => {
            scroll("features");
          }}
        >
          <ListItemButton>
            <ListItemIcon>
              <FaBookReader />
            </ListItemIcon>
            <ListItemText primary={"Features"}></ListItemText>
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={() => {
              navigate("/contact");
            }}
          >
            <ListItemIcon>
              <BsFillTelephoneFill />
            </ListItemIcon>
            <ListItemText primary={"Contact Us"}></ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  const NavLink = styled(Typography)(({ theme }) => ({
    fontSize: "14px",
    color: "#4F5361",
    fontWeight: "bold",
    cursor: "pointer",
    "&:hover": {
      color: "#000000",
      //   opacity: 0,
      transform: "scale(1.2)",
      transition: "all 0.2s ease-in-out 0.2s",
    },
  }));

  const NavLinksBox = styled(Box)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  const NavbarContainer = styled(Container)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.down("md")]: {
      padding: theme.spacing(2),
    },
  }));

  const NavbarLogo = styled("img")(({ theme }) => ({
    cursor: "pointer",
    height: "90px",
    width: "auto",
    mixBlendMode: "multiply",
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  }));

  return (
    <>
      {" "}
      <NavbarContainer>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "2.5rem",
          }}
        >
          <Box>
            <Box sx={{ display: { md: "none", sm: "flex" } }}>
              <GiHamburgerMenu
                onClick={toggleDrawer("left", true)}
              ></GiHamburgerMenu>
            </Box>

            <NavbarLogo src={Applogo} alt="logi" />
          </Box>

          <NavLinksBox>
            <List sx={{ display: "flex" }}>
              <ListItem
                onClick={() => {
                  navigate("/");
                  scroll("home");
                }}
              >
                <ListItemButton>
                  <ListItemText primary={"Home"}></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem
                onClick={() => {
                  scroll("features");
                }}
              >
                <ListItemButton>
                  <ListItemText primary={"Features"}></ListItemText>
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    navigate("/contact");
                  }}
                >
                  <ListItemText
                    primary={"Contact Us"}
                    style={{
                      width: "100px",
                    }}
                  ></ListItemText>
                </ListItemButton>
              </ListItem>
            </List>
          </NavLinksBox>
        </Box>

        {user || AuthenticationCheck() ? (
          <>
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <NavLink
                onClick={() => {
                  if (user?.role === "admin") {
                    navigate("/admin");
                  } else if (user?.role === "student") {
                    navigate("/student");
                  } else if (user?.role === "teacher") {
                    navigate("/teacher");
                  }
                }}
                variant="body2"
              >
                Go to Dashboard
              </NavLink>
              <NavLink
                onClick={() => {
                  removeCookies("token");
                  navigate("/login");
                  window.location.reload();
                }}
                variant="body2"
              >
                Log Out
              </NavLink>
            </Box>
          </>
        ) : (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "1rem",
            }}
          >
            <Button onClick={loginclick} variant="outlined">
              <Typography
                variant="body1"
                style={{
                  fontSize: "1rem",
                  color: "#0F184C",
                }}
              >
                Login/Register
              </Typography>
            </Button>
          </Box>
        )}
      </NavbarContainer>
      <Drawer
        anchor="left"
        open={mobileMenu.left}
        onClose={toggleDrawer("left", false)}
      >
        {list("left", NavItems)}
      </Drawer>
    </>
  );
};

export default Navbar;
