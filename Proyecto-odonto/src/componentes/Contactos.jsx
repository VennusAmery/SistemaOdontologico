import React from 'react';
import './Contactos.css';
import { useNavigate } from "react-router-dom";

function Contactos() {
  const navigate = useNavigate();

  return (
  <div>
    <h3>Contactos</h3>
      <hr />
      <hr />
      {/* Contenido principal */}
      <main className="contactos-content">
          <div className="contactos-grid">
            <div
              className="contactos-card"
              onClick={() => navigate('/Proveedores')}>
              <img src="/imagenes/proveedores.png" alt="Proveedores" />
              <p>PROVEEDORES</p>
            </div>
            <div className="contactos-card">
              <img src="/imagenes/iconoUsuario.png" alt="Doctores" />
              <p>DOCTORES</p>
            </div>
            </div>

        <button
          className="btn-regresar"
          onClick={() => navigate('/home')}
        >
          REGRESAR
        </button>
      </main>
    </div>
  );
}

export default Contactos;
