import React, { useState, useEffect, useMemo } from 'react';
import './citas.css';  // Puedes renombrar o copiar estilos de empleados.css para citas
import { useNavigate, useParams } from "react-router-dom";
import { motion } from 'framer-motion';
import axios from 'axios';

const tabConfig = [
  { id: 'listado', label: 'Historial Citas', path: '/citas' },
  { id: 'nuevo', label: 'Nueva Cita', path: '/programarcita' },
  { id: 'info', label: 'Información Cita', path: '/programarcita' },
];

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

const Citas = () => {
  const navigate = useNavigate();
  const { id_cita } = useParams();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  const [citas, setCitas] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCitas = async () => {
      setIsLoading(true);
      try {
        let res;
        if (id_cita) {
          res = await axios.get(`http://localhost:4000/api/listacita/${id_cita}`);
          setCitas([res.data]);
        } else {
          res = await axios.get('http://localhost:4000/api/listacita');
          setCitas(res.data);
        }
      } catch (err) {
        console.error("Error al obtener citas:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCitas();
  }, [id_cita]);

  // Debounce para la búsqueda
  useEffect(() => {
    const timeout = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // Filtrar citas según búsqueda
  const citasFiltradas = useMemo(() => {
    return citas.filter(cita => {
      const pacienteStr = cita.paciente_nombre?.toLowerCase() || '';
      const doctorStr = cita.doctor_encargado?.toLowerCase() || '';
      const searchStr = displayTerm.toLowerCase();

      return pacienteStr.includes(searchStr) ||
        doctorStr.includes(searchStr) ||
        cita.id_paciente?.toString().includes(searchStr);
    });
  }, [citas, displayTerm]);

  // Agrupar citas por fecha (igual que empleados agrupado por letra)
const agrupados = useMemo(() => {
  return citasFiltradas
    .sort((a, b) => {
      const nameA = (a.paciente_nombre || '').toLowerCase();
      const nameB = (b.paciente_nombre || '').toLowerCase();
      return nameA.localeCompare(nameB);
    })
    .reduce((acc, cita) => {
      const letra = (cita.paciente_nombre?.[0] || '#').toUpperCase();
      if (!acc[letra]) acc[letra] = [];
      acc[letra].push(cita);
      return acc;
    }, {});
}, [citasFiltradas]);


  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setDisplayTerm(searchTerm);
  };

  return (
    <div className="emplelist-container">
      <h2 className="emplelist-title">Citas</h2>
      <hr />

      {/* Tabs */}
      <nav className="emplelist-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`emplelist-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
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
        {/* Buscador */}
        <form className="emplelist-search-form" onSubmit={handleSearchSubmit}>
          <div className="emplelist-search-container">
            <input
              type="text"
              placeholder="Buscar por paciente, doctor o DPI..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="emplelist-search-input"
              disabled={isLoading}
            />
            <button type="submit" className="emplelist-search-icon" disabled={isLoading}>🔍</button>
          </div>
        </form>

        {/* Resultados */}
        <div className="emplelist-search-results">
  {isLoading ? (
    <div className="emplelist-loading">Cargando citas...</div>
  ) : Object.keys(agrupados).length > 0 ? (
    Object.keys(agrupados).sort().map(letra => (
      <div key={letra}>
        <div className="emplelist-letter-separator">{letra}</div>
        {agrupados[letra].map(cita => (
          <div
            key={cita.id_cita}
            className="emplelist-search-item"
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/programarcita/${cita.id_cita}`)}
            onKeyDown={e => {
              if (e.key === 'Enter') navigate(`/programarcita/${cita.id_cita}`);
            }}
          >
            {cita.paciente_nombre || `Paciente DPI: ${cita.id_paciente}`}
          </div>
        ))}
      </div>
    ))
  ) : (
    <div className="emplelist-search-noresults">
      {displayTerm ? 'No se encontraron citas con ese criterio' : 'No hay citas registradas'}
    </div>
  )}
</div>

        {/* Botones */}
        <div className="emplelist-form-buttons">
          <button
            type="button"
            className="emplelist-btn-back"
            onClick={() => navigate(-1)}
            disabled={isLoading}
          >
            REGRESAR
          </button>
          <button
            type="button"
            className="emplelist-btn-add"
            onClick={() => navigate('/programarcita')}
            disabled={isLoading}
          >
            AGREGAR CITA
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Citas;
