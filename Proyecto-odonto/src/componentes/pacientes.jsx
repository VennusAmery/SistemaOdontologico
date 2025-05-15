import React, { useState, useEffect, useMemo } from 'react';
import './pacientes.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

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
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [tabActiva, setActiveTab] = useState(tabConfig[0].id);

    const [pacientes, setPacientes] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [displayTerm, setDisplayTerm] = useState('');
  
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

  // Actualizar tab activa según URL
useEffect(() => {
  const fetchPacientes = async () => {
    try {
      let res;
      if (id) {
        res = await axios.get(`http://localhost:4000/api/listapacientes/${id}`);
        setPacientes([res.data]); // Si es uno solo, lo pones en un array
      } else {
        res = await axios.get('http://localhost:4000/api/listapacientes');
        setPacientes(res.data);
      }
    } catch (err) {
      console.error("Error al obtener datos del paciente:", err);
    }
  };

  fetchPacientes();
}, [id]);

  // Filtrado y agrupamiento
  const pacientesFiltrados = useMemo(() =>
    pacientes.filter(pa =>
      pa.nombre.toLowerCase().includes(displayTerm.toLowerCase())
    )
  , [pacientes, displayTerm]);

const agrupados = useMemo(() => {
  return pacientesFiltrados
    .filter(pac => typeof pac.nombre === 'string' && pac.nombre.length > 0)
    .sort((a, b) => {
      const nombreComparison = a.nombre.localeCompare(b.nombre);
      if (nombreComparison !== 0) {
        return nombreComparison; // Si los nombres son diferentes, usa esta comparación
      }
      return a.apellido.localeCompare(b.apellido); // Si los nombres son iguales, compara por apellido
    })
    .reduce((acc, pac) => {
      const letra = pac.nombre[0].toUpperCase();
      if (!acc[letra]) acc[letra] = [];
      acc[letra].push(pac);
      return acc;
    }, {});
}, [pacientesFiltrados]);



  // Handlers
  const handleTabClick = tab => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  const handleSearch = e => {
    e.preventDefault();
    setDisplayTerm(searchTerm);
  };

  return (
    <div className="pacienteslist-container">
          <AnimatePresence>
            {message && (
              <motion.div
                className={`flash-message ${messageType}`}
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5 }}>
                {message}
              </motion.div>
            )}
          </AnimatePresence>
      <h2 className="pacienteslist-title">Pacientes</h2>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="pacienteslist-tabs" aria-label="Secciones de Pacientes">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`pacienteslist-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
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
          onSubmit={handleSearch}>
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
          {pacientesFiltrados.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="pacienteslist-letter-separator">{letra}</div>
                {agrupados[letra].map(item => (
                  <div
                    key={item.dpi}
                    className="pacienteslist-search-item"
                    role="button"
                    onClick={() => navigate(`/agregarpaciente/${item.dpi}`)}
                    onKeyDown={e => e.key === 'Enter' && navigate(`/agregarpaciente/${item.dpi}`)}
                  >
                    {item.nombre} {item.apellido} 
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="pacienteslist-search-noresults">No se encontraron personas</div>
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
