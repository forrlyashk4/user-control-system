import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthorized } from "@/entities";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  if (!isAuthorized()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
