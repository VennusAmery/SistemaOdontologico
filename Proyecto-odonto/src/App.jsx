import React from "react";
import { AnimatePresence } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Login from "./componentes/Login";
import OlvideContraseña from "./componentes/olvidecontraseña";
import Home from "./componentes/home";
import Pacientes from "./componentes/pacientes";
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
import Listadoproveedores from "./componentes/listadoproveedores";

import "./App.css";
function App() {
  const location = useLocation();

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
        <Route path="/citas" element={<CitasComponent />} />
        <Route path="/Contactos" element={<ContactosComponent />} />
        <Route path="/Proveedores" element={<ProveedoresComponent />} />

        {/* Aquí puedes añadir más rutas protegidas/con sidebar */}
      </Route>
    </Routes>
  );
}

export default App;


