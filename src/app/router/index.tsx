import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthPage } from "@/pages";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Главная</div>} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/users" element={<div>Тут список пользователей</div>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
};
