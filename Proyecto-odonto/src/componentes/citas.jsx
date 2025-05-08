import React from 'react';
import './citas.css';
import { useNavigate } from "react-router-dom";

function Citas() {
  const navigate = useNavigate();

  return (
        <main className="citas-content">
          <h1 className="titulo-citas">Citas</h1>
          <div className="citas-header">
            <h2>Citas Pacientes</h2>
            <div className="busquedaa">
              <label htmlFor="buscar">Buscar:</label>
              <input type="text" id="buscar" placeholder="Buscar..." />
              <button className="btn-programar" onClick={() => navigate('/programarcita')}>PROGRAMAR CITA</button>
              <button className="btn-filtro">FILTRO</button>
              <button className="btn-historial" onClick={() => navigate('/historialcita')}>HISTORIAL</button>
            </div>
          </div>

          <div className="citas-recientes">
            <h3>Recientes</h3>
            <div className="citas-grid">
              <div className="cita-card">
                <img src="/imagenes/iconoUsuario.png" alt="Usuario" />
                <p>CODIGO CITA</p>
              </div>
              <div className="cita-card">
                <img src="/imagenes/iconoUsuario.png" alt="Usuario" />
                <p>CODIGO CITA</p>
              </div>
              <div className="cita-card">
                <img src="/imagenes/iconoUsuario.png" alt="Usuario" />
                <p>CODIGO CITA</p>
              </div>
            </div>
          </div>

          {/* <button className="btn-regresar" onClick={() => navigate('/home')}>REGRESAR</button> */}
        </main>
  );
}

export default Citas;