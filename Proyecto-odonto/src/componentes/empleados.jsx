import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './empleados.css';

const tabConfig = [
  { id: 'listadoMaterial', label: 'Listado de Empleados', path: '/empleados' },
  { id: 'ingresoMaterial', label: 'Agregar Nuevo Empleado', path: '/agregarempleado' },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

export default function empleados() {
  const navigate    = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  
  const [materials] = useState([
    'Kevin', 'Paula', 'Sofia', 'Maria', 'Alejandra',
    'Barbara', 'Sergio', 'Cesar', 'Diego', 'Stevens'
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
    <div className="emplelist-container">
      <h2 className="emplelist-title">Empleados</h2>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="emplelist-tabs" aria-label="Secciones de Empleados">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`emplelist-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="emplelist-search-section"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >
        {/* ——— Buscador ——— */}
        <form
          className="emplelist-search-form"
          onSubmit={e => {
            e.preventDefault();
            setDisplayTerm(searchTerm);
          }}
        >
          <div className="emplelist-search-container">
            <input
              type="text"
              className="emplelist-search-input"
              placeholder="Buscar material..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="emplelist-search-icon" aria-label="Buscar">🔍</button>
          </div>
        </form>

        {/* ——— Resultados ——— */}
        <div className="emplelist-search-results">
          {filtered.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="emplelist-letter-separator">{letra}</div>
                {agrupados[letra].map(item => (
                    <div
                      key={item}
                      className="emplelist-search-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`/infoMaterial/${encodeURIComponent(item)}`)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') navigate(`/infoMaterial/${encodeURIComponent(item)}`);
                      }}>
                      {item}
                    </div>
                  ))}
              </div>
            ))
          ) : (
            <div className="emplelist-search-noresults">No se encontraron materiales</div>
          )}
        </div>

        {/* ——— Botones de acción ——— */}
        <div className="emplelist-form-buttons">
          <button type="button" className="emplelist-btn-back"onClick={() => navigate(-1)}>REGRESAR </button>
        </div>
      </motion.section>
    </div>
  );
}

