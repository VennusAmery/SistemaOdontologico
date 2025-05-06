import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Inventario.css';

const tabConfig = [
  { id: 'listadoMaterial', label: 'Listado de Material', path: '/listadoMaterial' },
  { id: 'ingresoMaterial', label: 'Ingreso Material', path: '/ingresoMaterial' },
  { id: 'infoMaterial', label: 'Información de material utilizado', path: '/infoMaterial' },
  { id: 'citaMaterial', label: 'Material usado en cita', path: '/citaMaterial' },
];

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit:    { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 }
};

export default function Inventario() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  const [materials] = useState([
    'Algodón', 'Gasas', 'Jeringas', 'Agujas', 'Guantes',
    'Mascarillas', 'Esterilizante', 'Barniz', 'Terminales', 'Selladores'
  ]);

  // Debounce
  useEffect(() => {
    const id = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  const filtered = useMemo(
    () => materials.filter(name =>
      name.toLowerCase().includes(displayTerm.toLowerCase())
    ),
    [materials, displayTerm]
  );

  const handleTabClick = tab => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="inv-container">
      <h2 className="inv-title">Inventario</h2>
      <hr />

      <nav className="inv-tabs" aria-label="Secciones de Inventario">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`inv-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
  className="inv-search-section"
  variants={slideVariants}
  initial="initial"
  animate="animate"
  exit="exit"
  transition={slideVariants.transition}
>
  {/* Input de búsqueda más ancho */}
  <div className="inv-search-wrapper" style={{ width: '100%', marginBottom: '1rem' }}>
    <span className="inv-search-icon">🔍</span>
    <input
      type="text"
      className="inv-search-input"
      placeholder="Buscar material..."
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      style={{ width: '100%', maxWidth: '500px' }}
    />
  </div>

  {/* Resultados debajo del input, en orden alfabético */}
  <div className="inv-search-results" style={{ maxHeight: '300px', overflowY: 'auto' }}>
    {[...filtered].sort().length > 0 ? (
      [...filtered].sort().map(name => (
        <div key={name} className="inv-search-item">
          {name}
        </div>
      ))
    ) : (
      <div className="inv-search-noresults">No se encontraron materiales</div>
    )}
  </div>
</motion.section>
    </div>
  );
}
