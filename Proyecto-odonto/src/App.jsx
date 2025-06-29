import React from "react";
import { AnimatePresence } from 'framer-motion';
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import Login from "./componentes/login";
import OlvideContraseña from "./componentes/olvidecontraseña";
import Home from "./componentes/home";
import Pacientes from "./componentes/pacientes";
import Habitos from "./componentes/habitos";
import HistorialOdontologico from "./componentes/historialodontologico";
import HistorialMedico from "./componentes/historialmedico";
import Fotografias from "./componentes/fotografias";
import CalendarComponent from "./componentes/calendario";
import Layout from "./componentes/layout";
import CitasComponent from "./componentes/citas";
import ContactosComponent from "./componentes/Contactos";
import ProveedoresComponent from "./componentes/Proveedores"; 
import ProgramarCita from "./componentes/programarcita";
import Doctores from "./componentes/Doctores";
import Empleados from "./componentes/empleados";
import Inventario from "./componentes/Inventario";
import IngresoMaterial from "./componentes/ingresoMaterial";
import InfoMaterial from "./componentes/infoMaterial";
import Clinica from "./componentes/clinica";
import ClinicaJalapa from './componentes/ClinicaJalapa';
import AgregarEmpleado from "./componentes/agregarempleado";
import Listadoproveedores from "./componentes/listadoproveedores";
import AgregarPaciente from "./componentes/agregarpaciente";
import "./App.css";
import Listdoctores from "./componentes/Listdoctores";
import Tratamiento from "./componentes/tratamiento";
import Proveedorinfo from './componentes/proveedorinfo';
import IngresoDoctor from './componentes/IngresoDoctor';
import Empleadoinfo from './componentes/empleadoinfo';
import Infocita from './componentes/infocita';
import Usuario from './componentes/usuario';

function App() {
  const location = useLocation();

  return (
      <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>

      {/* Rutas sin Layout (sin sidebar) */}
      <Route path="/" element={<Login />} />
      <Route path="/olvidecontraseña" element={<OlvideContraseña />} />
      
      {/* Rutas con Layout (con sidebar) */}
      <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/pacientes" element={<Pacientes />} />
          <Route path="/agregarpaciente" element={<AgregarPaciente />} />
          <Route path="/habitos" element={<Habitos />} />
          <Route path="/historialodontologico" element={<HistorialOdontologico />} />
          <Route path="/historialmedico" element={<HistorialMedico />} />
          <Route path="/fotografias" element={<Fotografias />} />
          <Route path="/calendario" element={<CalendarComponent />} />
          <Route path="/InfoMaterial/:id" element={<InfoMaterial />} />
          <Route path="/citas" element={<CitasComponent />} />
          <Route path="/Contactos" element={<ContactosComponent />} />
          <Route path="/Proveedores" element={<ProveedoresComponent />} />
          
          <Route path="/programarcita/:id" element={<Infocita />} />
          <Route path="/programarcita" element={<ProgramarCita />} />
          
          <Route path="/Doctores" element={<Doctores />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/Inventario" element={<Inventario />} />
          <Route path="/IngresoMaterial" element={<IngresoMaterial />} />
          <Route path="/Clinica" element={<Clinica />} />
          <Route path="/clinicaJalapa" element={<ClinicaJalapa />} />
          <Route path="/agregarempleado" element={<AgregarEmpleado />} /> 
          <Route path="/listadoproveedores" element={<Listadoproveedores />} />
          <Route path="/Listdoctores" element={<Listdoctores />} />
          <Route path="/tratamiento" element={<Tratamiento />} />
          <Route path="/proveedores/:id" element={<Proveedorinfo />} />
          <Route path="/ingresodoctor/:id" element={<IngresoDoctor />} />
          <Route path="/empleadoinfo/:id" element={<Empleadoinfo />} />

          <Route path="/usuario" element={<Usuario />} />

        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;