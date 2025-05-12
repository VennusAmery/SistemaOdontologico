import React, { useState, useEffect, useMemo } from 'react';
import './pacientes.css';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from "react-router-dom";

const tabConfig = [
  { id: 'listadoPaciente', label: 'Listado', path: '/pacientes' },
  { id: 'infoPaciente', label: 'Información de paciente', path: '/agregarpaciente' },
  { id: 'habitos', label: 'Hábitos', path: '/habitos' },
  { id: 'historialOdont', label: 'Historial Odontológico', path: '/historialodontologico' },
  { id: 'historialMed', label: 'Historial Médico', path: '/historialmedico' },
  { id: 'fotografias', label: 'Fotografías', path: '/fotografias' },
  { id: 'tratamiento', label: 'Tratamiento', path: '/tratamiento' },
];

const tabVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 }
};

export default function Pacientes() {
  const navigate = useNavigate();
  const location = useLocation();

  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  const [materials] = useState([
    'Alicia', 'Roberto', 'Nelson', 'Lilian', 'Sofia',
    'Barbara', 'Daniela', 'Diego', 'Alejandra', 'Walter'
  ]);

  // Actualizar tab activa según URL
  useEffect(() => {
    const currentTab = tabConfig.find(tab => tab.path === location.pathname);
    if (currentTab) setTabActiva(currentTab.id);
  }, [location]);

  // Debounce para displayTerm
  useEffect(() => {
    const id = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Filtrar materiales según displayTerm
  const filtered = useMemo(() =>
    materials.filter(name =>
      name.toLowerCase().includes(displayTerm.toLowerCase())
    ), [materials, displayTerm]);

  // Agrupar alfabéticamente
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
    <div className="pacienteslist-container">
      <h2 className="pacienteslist-title">Pacientes</h2>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="pacienteslist-tabs" aria-label="Secciones de Pacientes">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`pacienteslist-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="pacienteslist-search-section"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}>

        {/* ——— Buscador ——— */}
        <form
          className="pacienteslist-search-form"
          onSubmit={e => {
            e.preventDefault();
            setDisplayTerm(searchTerm);
          }}>
          <div className="pacienteslist-search-container">
            <input
              type="text"
              className="pacienteslist-search-input"
              placeholder="Buscar paciente..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)} />
            <button type="submit" className="pacienteslist-search-icon" aria-label="Buscar">🔍</button>
          </div>
        </form>

        {/* ——— Resultados ——— */}
        <div className="pacienteslist-search-results">
          {filtered.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="pacienteslist-letter-separator">{letra}</div>
                {agrupados[letra].map(item => (
                  <div
                    key={item}
                    className="pacienteslist-search-item"
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
            <div className="pacienteslist-search-noresults">No se encontraron materiales</div>
          )}
        </div>

        {/* ——— Botones de acción ——— */}
        <div className="pacienteslist-form-buttons">
          <button type="button" className="pacienteslist-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
        </div>
      </motion.section>
    </div>
  );
}
