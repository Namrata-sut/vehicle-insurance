import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

import Dashboard from "./components/Dashboard";
import AddVehicle from "./components/AddVehicle";
import VehicleList from "./components/VehicleList";
import Summary from "./components/Summary";

import "./App.css";

function App() {
  return (
    <BrowserRouter>

      {/* ===== NAVIGATION BAR ===== */}
      <nav>
        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/add">
          Add Vehicle
        </NavLink>

        <NavLink to="/list">
          Vehicle List
        </NavLink>

        <NavLink to="/summary">
          Summary
        </NavLink>
      </nav>

      {/* ===== PAGE ROUTES ===== */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddVehicle />} />
        <Route path="/list" element={<VehicleList />} />
        <Route path="/summary" element={<Summary />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
