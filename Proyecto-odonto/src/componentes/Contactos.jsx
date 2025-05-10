
import React, { useState } from 'react';
import './Contactos.css';
import { useNavigate } from 'react-router-dom';

function Contactos() {
  const navigate = useNavigate();

  const tabConfig = [
    { id: 'contactos', label: 'contactos', path: '/contactos' },
    { id: '', label: '', path: '' },
  ];

  const [contTabActiva, setContTabActiva] = useState(tabConfig[0].id);

  const handleTabClick = (tab) => {
    setContTabActiva(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="cont-container">
      <h1 className="cont-title">Contactos</h1>
      <hr className="cont-separator" />
      <hr className="cont-separator" />

      <main className="contactos-content">
        <div className="contactos-grid">
          <div className="contactos-card" onClick={() => navigate('/listadoproveedores')}>
            <img src="/imagenes/proveedores.png" alt="Proveedores" />
            <p>PROVEEDORES</p>
          </div>

          <div className="contactos-card" onClick={() => navigate('/Listdoctores')}>
            <img src="/imagenes/iconoUsuario.png" alt="Doctores" />
            <p>DOCTORES</p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default Contactos;
