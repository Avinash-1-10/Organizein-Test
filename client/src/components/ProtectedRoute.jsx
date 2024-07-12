import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, redirect = "/login" }) => {
  if (!user) {
    return <Navigate to={redirect} replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
