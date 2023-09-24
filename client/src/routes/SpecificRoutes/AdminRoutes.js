import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { API } from "../../BaseURLProvider";
import {
  AuthenticationCheck,
  AuthVerification,
} from "../../configurations/systemUtillies";

export const AdminRoute = () => {
  const location = useLocation();
  const [role, setRole] = useState(undefined);
  const [userInfo, setUserInfo] = useState();

  useEffect(() => {
    API.get("/user/loggedInUser")
      .then((res) => {
        setUserInfo(res.data.user);
        setRole(res.data.user.role);
      })
      .catch((err) => {
        if (err) {
          return <Navigate to="/login" replace state={{ from: location }} />;
        }
      });
  }, []);

  if (AuthenticationCheck()) {
    if (role !== undefined) {
      if (role === "admin") {
        return <Outlet userInfo={userInfo} />;
      } else if (role !== "admin") {
        return (
          <Navigate to="/unauthorized" replace state={{ from: location }} />
        );
      }
    }
  } else {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
};
