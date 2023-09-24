import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage.js";
import Landing from "../Components/Landing";
import ContactForm from "../Components/ContactForm.js";
import { Features } from "../Components/Features.js";
import AdminIndex from "../Components/AdminDashboard/AdminIndex.js";
import StudentIndex from "../Components/StudentDashboard/StudentIndex.js";
import TeacherIndex from "../Components/TeacherDashboard/TeacherIndex";
import ForgetPassword from "../pages/ForgetPassword.js";
import ResetPassword from "../pages/ResetPassword.js";
import { AdminRoute } from "./SpecificRoutes/AdminRoutes.js";
import UnAuthorizedPage from "../pages/UnAuthorizedPage.js";
import NotFound from "../pages/NotFound.js";
import { TeacherRoutes } from "./SpecificRoutes/TeacherRoutes.js";
import { StudentRoute } from "./SpecificRoutes/StudentRoutes.js";
import { API } from "../BaseURLProvider.js";
import { Context } from "../Context/ContextConfig.js";
import { AuthenticationCheck } from "../configurations/systemUtillies.js";

export const AppRoutes = () => {
  const [user, setUser] = useState(undefined);
  const [status, setStatus] = useState(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    API.get("/user/loggedInUser")
      .then((res) => {
        setUser(res.data.user);
        setIsLoading(false); // set loading state to false
      })
      .catch((err) => {
        if (err) {
          setIsLoading(false); // set loading state to false
          return <Navigate to="/login" />;
        }
      });
  }, []);

  const updateUser = (newUserData) => {
    setUser(newUserData);
  };
  const Updatestatus = (status) => {
    setStatus(status);
  };

  // render loading indicator if isLoading is true
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Context.Provider
      value={{ user, update: updateUser, status, Updatestatus }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactForm />} />
          <Route path="/features" element={<Features />} />
          <Route element={<AdminRoute />}>
            <Route path="/admin/*" element={<AdminIndex />} />
          </Route>
          <Route element={<StudentRoute />}>
            <Route path="/student/*" element={<StudentIndex />} />
          </Route>
          <Route element={<TeacherRoutes />}>
            <Route path="/teacher/*" element={<TeacherIndex />} />
          </Route>
          <Route path="/forget-password" element={<ResetPassword />} />
          <Route path="/reset/:id?/:token?" element={<ForgetPassword />} />
          <Route path="/unauthorized" element={<UnAuthorizedPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </Context.Provider>
  );
};
