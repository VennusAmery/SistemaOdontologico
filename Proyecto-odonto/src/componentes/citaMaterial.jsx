import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './citaMaterial.css';

const mockData = [
  { id: 1, nombre: 'Guantes', cantidad: 2 },
  { id: 2, nombre: 'Mascarilla', cantidad: 1 },
  { id: 3, nombre: 'Gasas', cantidad: 5 },
];

const CitaMaterial = () => {
  const navigate = useNavigate();
  const { citaId } = useParams();

  const [materiales, setMateriales] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Cargar datos reales aquí (mock for now)
    setMateriales(mockData);
  }, [citaId]);

  const filtered = materiales.filter(m =>
    m.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="cita-container">
      <header className="cita-header">
        <button className="back-btn" onClick={() => navigate(-1)}>Volver</button>
        <h1>Material de Cita #{citaId || ''}</h1>
      </header>

      <div className="cita-search">
        <input
          type="text"
          placeholder="Buscar material..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <ul className="cita-list">
        {filtered.length ? (
          filtered.map(item => (
            <li key={item.id} className="cita-item">
              <span className="item-name">{item.nombre}</span>
              <span className="item-qty">Cantidad: {item.cantidad}</span>
            </li>
          ))
        ) : (
          <li className="no-results">No se encontró material</li>
        )}
      </ul>

      <footer className="cita-footer">
        <button onClick={() => navigate('/inventario')}>Ir a Inventario</button>
      </footer>
    </div>
  );
};

export default CitaMaterial;