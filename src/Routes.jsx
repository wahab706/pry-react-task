import React from "react";
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { Home } from "./pages/index";

export default function Routes() {
  return (
    <RouterRoutes>
      <Route path="/" element={<Home />} />
    </RouterRoutes>
  );
}
