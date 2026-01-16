import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthorized } from "@/entities";

export const PublicRoute = ({ children }: { children: JSX.Element }) => {
  if (isAuthorized()) {
    return <Navigate to="/users" replace />;
  }

  return children;
};
