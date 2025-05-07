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
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

export default function Inventario() {
  const navigate    = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  const [materials] = useState([
    'Algodón', 'Gasas', 'Jeringas', 'Agujas', 'Guantes',
    'Mascarillas', 'Esterilizante', 'Barniz', 'Terminales', 'Selladores'
  ]);

  // 1️⃣ Debounce para `displayTerm`
  useEffect(() => {
    const id = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // 2️⃣ Filtrar según `displayTerm`
  const filtered = useMemo(
    () =>
      materials.filter(name =>
        name.toLowerCase().includes(displayTerm.toLowerCase())
      ),
    [materials, displayTerm]
  );

  // 3️⃣ Agrupar alfabéticamente los filtrados
  const agrupados = useMemo(() => {
    return filtered
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, item) => {
        const letra = item[0].toUpperCase();
        if (!acc[letra]) acc[letra] = [];
        acc[letra].push(item);
        return acc;
      }, {});
  }, [filtered]);

  const handleTabClick = tab => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="inv-container">
      <h2 className="inv-title">Inventario</h2>
      <hr />

      {/* ——— Tabs ——— */}
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
        {/* ——— Buscador ——— */}
        <form
          className="inv-search-form"
          onSubmit={e => {
            e.preventDefault();
            setDisplayTerm(searchTerm);
          }}
        >
          <div className="inv-search-container">
            <input
              type="text"
              className="inv-search-input"
              placeholder="Buscar material..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="inv-search-icon" aria-label="Buscar">
              🔍
            </button>
          </div>
        </form>

        {/* ——— Resultados ——— */}
        <div className="inv-search-results">
          {filtered.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="inv-letter-separator">{letra}</div>
                {agrupados[letra].map(item => (
                  <div key={item} className="inv-search-item">
                    {item}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="inv-search-noresults">No se encontraron materiales</div>
          )}
        </div>

        {/* ——— Botones de acción ——— */}
        <div className="inve-form-buttons">
          <button type="button" className="inv-btn-delete">Eliminar</button>
          <button type="button" className="inv-btn-edit">Modificar</button>
          <button type="button" className="inv-btn-add">Agregar</button>
          <button type="button" className="inv-btn-back"onClick={() => navigate(-1)}>Regresar </button>
        </div>
      </motion.section>
    </div>
  );
}
