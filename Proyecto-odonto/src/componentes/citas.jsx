import React, { useState, useEffect, useMemo } from 'react';
import './citas.css';
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const tabConfig = [
  { id: 'listadoMaterial', label: 'Historial Citas', path: '/citas' },
  { id: 'ingresoMaterial', label: 'Nueva Cita', path: '/programarcita' },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

const Citas = () => {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  
  const [pacientes] = useState([
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
      pacientes.filter(name =>
        name.toLowerCase().includes(displayTerm.toLowerCase())
      ),
    [pacientes, displayTerm]
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

  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  // Estado y función para el flash message
  const [message, setMessage] = useState('');
  const flashMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleSave = () => flashMessage('💾 Guardado correctamente');

  return (
    <div className="citas-container">
      <h2 className="citas-title">Citas</h2>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="citas-tabs" aria-label="Secciones de PacientesCitas">
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`citas-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="citas-search-section"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}>
        {/* ——— Buscador ——— */}
        <form
          className="citas-search-form"
          onSubmit={(e) => {
            e.preventDefault();
            setDisplayTerm(searchTerm);
          }}>
          <div className="citas-search-container">
            <input
              type="text"
              className="citas-search-input"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="citas-search-icon" aria-label="Buscar">🔍</button>
          </div>
        </form>

        {/* ——— Resultados ——— */}
        <div className="citas-search-results">
          {filtered.length > 0 ? (
            Object.keys(agrupados).sort().map((letra) => (
              <div key={letra}>
                <div className="citas-letter-separator">{letra}</div>
                {agrupados[letra].map((item) => (
                  <div
                    key={item}
                    className="citas-search-item"
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
            <div className="citas-search-noresults">No se encontró paciente</div>
          )}
        </div>

        {/* ——— Botones de acción ——— */}
        <div className="citas-form-buttons">
          <button type="button" className="citas-btn-back" onClick={() => navigate(-1)}> REGRESAR </button>
          <button type="button" className="citas-btn-add" onClick={() => navigate('/programarcita')} > AGREGAR</button>
        </div>
      </motion.section>
    </div>
  );
};

export default Citas;
