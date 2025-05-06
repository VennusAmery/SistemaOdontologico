import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Inventario.css';

const tabConfig = [
  { id: 'listadoMaterial', label: 'Listado de Material', path: '/listadoMaterial' },
  { id: 'ingresoMaterial', label: 'Ingreso Material', path: '/ingresoMaterial' },
  { id: 'infoMaterial', label: 'Información de material utilizado', path: '/infoMaterial' },
  { id: 'citaMaterial', label: 'Material usado en cita', path: '/citaMaterial' },
  { id: 'nuevaPestana1', label: 'Nueva Pestaña 1', path: '/nuevaPestana1' },
  { id: 'nuevaPestana2', label: 'Nueva Pestaña 2', path: '/nuevaPestana2' },
  { id: 'nuevaPestana3', label: 'Nueva Pestaña 3', path: '/nuevaPestana3' },
  { id: 'nuevaPestana4', label: 'Nueva Pestaña 4', path: '/nuevaPestana4' },
];

const Inventario = () => {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);

  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="inv-container">
      <h1 className="inv-title">Inventario</h1>
      <hr />
      <div className="inv-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`inv-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="inv-content">
        {tabConfig.map(tab => (
          tabActiva === tab.id && (
            <div key={tab.id} className={`inv-section inv-${tab.id}`}>
              <h2>{tab.label}</h2>
              {/* Contenido específico de {tab.label} */}
            </div>
          )
        ))}
      </div>

      <div className="inv-search-section">
        <label className="inv-search-label">Buscar:</label>
        <input type="text" className="inv-search-input" />
      </div>
    </div>
  );
};

export default Inventario;
