import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navigate, Outlet } from "react-router-dom";
import { API } from "../../BaseURLProvider";
import {
  AuthenticationCheck,
  AuthVerification,
} from "../../configurations/systemUtillies";

export const StudentRoute = () => {
  const location = useLocation();
  const [role, setRole] = useState(undefined);

  useEffect(() => {
    API.get("/user/loggedInUser")
      .then((res) => {
        setRole(res.data.user.role);
      })
      .catch((err) => {
        return <Navigate to="/login" replace state={{ from: location }} />;
      });
  }, []);

  if (AuthenticationCheck()) {
    if (role !== undefined) {
      if (role === "student") {
        return (
          <>
            <Outlet />
          </>
        );
      } else if (role !== "student") {
        return (
          <Navigate to="/unauthorized" replace state={{ from: location }} />
        );
      }
    }
  } else {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
};
