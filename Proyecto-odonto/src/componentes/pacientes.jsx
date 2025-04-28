import React from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

function Pacientes() {
  const navigate = useNavigate();

  return (
    <main className="home-content">
      <h1>Bienvenido/a [USUARIO]</h1>
      <div className="grid-botones">
        <button onClick={() => navigate('/pacientes')}>
          <img src="/imagenes/pacienteLogo.png" alt="Pacientes" className="icono-boton2" />PACIENTES
        </button>
        <button onClick={() => navigate('/citas')}>
          <img src="/imagenes/citasLogo.png" alt="Citas" className="icono-boton2" />CITAS
        </button>
        <button onClick={() => navigate('/calendario')}>
          <img src="/imagenes/calendarioLogo.png" alt="Calendario" className="icono-boton2" />CALENDARIO
        </button>
        <button onClick={() => navigate('/empleados')}>
          <img src="/imagenes/empleadosLogo.png" alt="Empleados" className="icono-boton2" />EMPLEADOS
        </button>
        <button onClick={() => navigate('/contactos')}>
          <img src="/imagenes/contactoLogo.png" alt="Contactos" className="icono-boton2" />CONTACTOS
        </button>
        <button onClick={() => navigate('/inventario')}>
          <img src="/imagenes/inventarioLogo.png" alt="Inventario" className="icono-boton2" />INVENTARIO
        </button>
        <button onClick={() => navigate('/clinica')}>
          <img src="/imagenes/ubicacionLogo.png" alt="Clínica" className="icono-boton2" />CLINICA
        </button> 
      </div>
    </main>
  );
}

export default Pacientes;
