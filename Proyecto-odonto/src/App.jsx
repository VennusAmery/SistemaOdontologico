import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import OlvideContraseña from "./componentes/olvidecontraseña";
import Home from "./componentes/home";
import Pacientes from "./componentes/pacientes";
import CalendarComponent from "./componentes/calendario";
import Layout from "./componentes/layout";
import "./App.css";

function App() {
  return (
    <Routes>
      {/* Rutas sin Layout (sin sidebar) */}
      <Route path="/" element={<Login />} />
      <Route path="/olvidecontraseña" element={<OlvideContraseña />} />
      
      {/* Rutas con Layout (con sidebar) */}
      <Route element={<Layout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/calendario" element={<CalendarComponent />} />
        {/* Aquí puedes añadir más rutas protegidas/con sidebar */}
      </Route>
    </Routes>
  );
}

export default App;


