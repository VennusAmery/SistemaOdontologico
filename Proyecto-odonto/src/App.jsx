import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import OlvideContraseña from "./componentes/olvidecontraseña";
import Home from "./componentes/home";
import Pacientes from "./componentes/pacientes";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/olvidecontraseña" element={<OlvideContraseña />} />
      <Route path="/home" element={<Home />} />
      <Route path="/pacientes" element={<Pacientes />} /> {/* Ruta para el componente Pacientes */}
    </Routes>
  );
}

export default App;


