import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './infoMaterial.css';

const mockInfo = [
  { id: 1, nombre: 'Guantes', descripcion: 'Guantes de látex desechar al finalizar cita', ubicacion: 'Estante A3' },
  { id: 2, nombre: 'Mascarilla', descripcion: 'Mascarilla quirúrgica N95', ubicacion: 'Estante B1' },
  { id: 3, nombre: 'Gasas', descripcion: 'Gasas estériles 10x10 cm', ubicacion: 'Estante C2' },
];

const InfoMaterial = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // En un caso real, aquí harías fetch a tu API
    setInfo(mockInfo);
  }, []);

  // Filtrar por nombre o descripción
  const filtered = info.filter(item =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="info-container">
      <header className="info-header">
        <button className="back-btn" onClick={() => navigate(-1)}>Volver</button>
        <h1>Información de Material</h1>
      </header>

      <div className="info-search">
        <input
          type="text"
          placeholder="Buscar material por nombre o descripción..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="info-list">
        {filtered.length ? (
          filtered.map(item => (
            <li key={item.id} className="info-item">
              <h2 className="item-name">{item.nombre}</h2>
              <p className="item-desc">{item.descripcion}</p>
              <p className="item-loc">Ubicación: {item.ubicacion}</p>
            </li>
          ))
        ) : (
          <li className="no-results">No se encontró material</li>
        )}
      </ul>

      <footer className="info-footer">
        <button onClick={() => navigate('/inventario')}>Ir a Inventario</button>
      </footer>
    </div>
  );
};

export default InfoMaterial;
