import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { PublicRoutes } from "../common/ConditionalRoutes";
import NotFound from "../NotFound";
import NotVerified from "./NotVerified";
import EmailVerify from "./EmailVerify";
import ResetPassword from "./ResetPassword";
import PasswordVerify from "./PasswordVerify";

const Authentication = () => {
  return (
    <PublicRoutes>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/not-verified" element={<NotVerified />} />
        <Route path="/verify" element={<EmailVerify />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/reset-password-verify" element={<PasswordVerify />} />
      </Routes>
    </PublicRoutes>
  );
};

export default Authentication;
