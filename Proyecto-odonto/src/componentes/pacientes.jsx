import React from 'react';
import './pacientes.css';
import { useNavigate } from "react-router-dom";

function Pacientes() {
  const navigate = useNavigate();

  const handleAgregarPaciente = () => {
    // Navega a la ruta del formulario de agregar paciente
    navigate("/agregarpaciente");
  };

  return (
    <main className="pacientes-content">
      <h1 className="titulo-pacientes">Pacientes</h1>
      <div className="pacientes-header">
        <h2>Lista de Pacientes</h2>
        <div className="busquedas">
          <label htmlFor="buscar">Buscar:</label>
          <input type="text" id="buscar" placeholder="Buscar..." />
          <button 
            className="btn-programar" 
            onClick={handleAgregarPaciente}>AGREGAR PACIENTE</button>
          <button className="btn-historial">LISTADO</button>
        </div>
      </div>

      <div className="pacientes-recientes">
        <h3>Recientes</h3>
        <div className="pacientes-grid">
          <div className="pacientes-card">
            <img src="/imagenes/iconoUsuario.png" alt="Usuario" />
            <p>NOMBRE PACIENTE</p>
          </div>
          <div className="pacientes-card">
            <img src="/imagenes/iconoUsuario.png" alt="Usuario" />
            <p>NOMBRE PACIENTE</p>
          </div>
          <div className="pacientes-card">
            <img src="/imagenes/iconoUsuario.png" alt="Usuario" />
            <p>NOMBRE PACIENTE</p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Pacientes;
