import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "@/pages";
import { PublicRoute } from "./PublicRoute";
import { ProtectedRoute } from "./PrivateRoute";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <AuthPage />
            </PublicRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <h1>todo: Страница пользователей</h1>
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <ProtectedRoute>
              <h1>todo: 404</h1>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
