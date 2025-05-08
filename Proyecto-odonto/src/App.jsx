import React from "react";
import { AnimatePresence } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import OlvideContraseña from "./componentes/olvidecontraseña";
import Home from "./componentes/home";
import Pacientes from "./componentes/pacientes";
import Agregarpaciente from "./componentes/agregarpaciente"; 
import Habitos from "./componentes/habitos";
import Historialodontologico from "./componentes/historialodontologico";
import Historialmedico from "./componentes/historialmedico";
import CalendarComponent from "./componentes/calendario";
import Layout from "./componentes/layout";
import CitasComponent from "./componentes/citas";
import ContactosComponent from "./componentes/Contactos";
import ProveedoresComponent from "./componentes/Proveedores"; 
import ProgramarCita from "./componentes/programarcita"; // Importa el componente ProgramarCita
import HistorialCita from "./componentes/historialcita"; // Importa el componente ProgramarCita
import Doctores from "./componentes/Doctores";
import Empleados from "./componentes/empleados";
import Inventario from "./componentes/Inventario";
import IngresoMaterial from "./componentes/ingresoMaterial";
import InfoMaterial from "./componentes/infoMaterial";
import CitaMaterial from "./componentes/citaMaterial";
import Clinica from "./componentes/clinica";
import ClinicaJalapa from './componentes/ClinicaJalapa';
import AgregarEmpleado from "./componentes/agregarempleado";

import "./App.css";
function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Rutas sin Layout (sin sidebar) */}
        <Route path="/" element={<Login />} />
        <Route path="/olvidecontraseña" element={<OlvideContraseña />} />

        {/* Rutas con Layout */}
        <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/agregarpaciente" element={<Agregarpaciente />} />
          <Route path="/habitos" element={<Habitos />} />
          <Route path="/historialodontologico" element={<Historialodontologico />} />
          <Route path="/historialmedico" element={<Historialmedico />} />
          <Route path="/calendario" element={<CalendarComponent />} />
          <Route path="/citas" element={<CitasComponent />} />
          <Route path="/Contactos" element={<ContactosComponent />} />
          <Route path="/Proveedores" element={<ProveedoresComponent />} />
          <Route path="/programarcita" element={<ProgramarCita />} />
          <Route path="/historialcita" element={<HistorialCita />} />
          <Route path="/Doctores" element={<Doctores />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/Inventario" element={<Inventario />} />
          <Route path="/IngresoMaterial" element={<IngresoMaterial />} />
          <Route path="/InfoMaterial" element={<InfoMaterial />} />
          <Route path="/CitaMaterial" element={<CitaMaterial />} />
          <Route path="/Clinica" element={<Clinica />} />
          <Route path="/clinicaJalapa" element={<ClinicaJalapa />} />
          <Route path="/agregarempleado" element={<AgregarEmpleado />} /> {/* Nueva ruta para agregar empleado */}
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;


