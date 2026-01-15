import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<div>Главная</div>} />
      <Route path="*" element={<div>404</div>} />
    </Routes>
  </BrowserRouter>
);
