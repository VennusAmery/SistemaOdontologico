import React from 'react';
import './Contactos.css';
import { useNavigate } from "react-router-dom";



function Contactos() {
  const navigate = useNavigate();

  return (
    
<div>
    <div>
        <main className="contactos-content">
          <div className="contactos-recientes">
            <h3>Recientes</h3>
            <div className="contactos-grid">
              <div className="contactos-card">
                <img src="/imagenes/proveedores.png" alt="Usuario" />
                <p>PROVEEDORES</p>
              </div>
              <div className="contactos-card">
                <img src="/imagenes/iconoUsuario.png" alt="Usuario" />
                <p>DOCTORES</p>
              </div>
            </div>
          </div>

          <button className="btn-regresar" onClick={() => navigate('/home')}>REGRESAR</button>
        </main>
      </div>
    </div>
  );
}

export default Contactos;