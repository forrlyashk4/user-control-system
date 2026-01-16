import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage, NotFound } from "@/pages";
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
              <LoginPage />
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
