import React, { useState, useEffect, useMemo } from 'react';
import './citas.css';
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const tabConfig = [
  { id: 'listadoMaterial', label: 'Historial Citas', path: '/citas' },
  { id: 'ingresoMaterial', label: 'Nueva Cita', path: '/programarcita' },
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
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Obtener citas del backend
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
      showFlash('❌ Error al cargar citas', 'error');
    } finally {
      setIsLoading(false);
    }
  };
  fetchCitas();
}, [id_cita]);

  // Debounce para la búsqueda
  useEffect(() => {
    const id_cita = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(id_cita);
  }, [searchTerm]);

  // Filtrar citas según término de búsqueda
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

  // Agrupar citas por fecha
  const citasAgrupadas = useMemo(() => {
    return citasFiltradas
      .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
      .reduce((acc, cita) => {
        const fecha = new Date(cita.fecha).toLocaleDateString('es-GT');
        if (!acc[fecha]) acc[fecha] = [];
        acc[fecha].push(cita);
        return acc;
      }, {});
  }, [citasFiltradas]);

  // Mostrar mensajes flash
  const showFlash = (text, type = 'success') => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(''), 3000);
  };

  // Eliminar una cita
  const handleDelete = async (id_cita) => {
    if (!window.confirm('¿Está seguro de eliminar esta cita?')) return;
    
    try {
      await axios.delete(`http://localhost:4000/api/listacita/${id_cita}`);
      setCitas(citas.filter(c => c.id_cita !== id_cita));
      showFlash('🗑️ Cita eliminada correctamente');
    } catch (err) {
      console.error("Error al eliminar cita:", err);
      showFlash('❌ Error al eliminar cita', 'error');
    }
  };

  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setDisplayTerm(searchTerm);
  };

  return (
    <div className="citas-container">
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

      <h2 className="citas-title">Citas</h2>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="citas-tabs" aria-label="Secciones de Citas">
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
        <form className="citas-search-form" onSubmit={handleSearch}>
          <div className="citas-search-container">
            <input
              type="text"
              className="citas-search-input"
              placeholder="Buscar por paciente, doctor o DPI..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              className="citas-search-icon" 
              aria-label="Buscar"
              disabled={isLoading}>
              🔍
            </button>
          </div>
        </form>

        {/* ——— Resultados ——— */}
        <div className="citas-search-results">
          {isLoading ? (
            <div className="citas-loading">Cargando citas...</div>
          ) : citasFiltradas.length > 0 ? (
            Object.keys(citasAgrupadas).sort().reverse().map((fecha) => (
              <div key={fecha}>
                <div className="citas-date-separator">{fecha}</div>
                {citasAgrupadas[fecha].map((cita) => (
                  <div key={cita.id_cita} className="citas-card">
                    <div className="citas-card-header">
                      <span className="citas-card-time">
                        {new Date(`1970-01-01T${cita.hora}`).toLocaleTimeString('es-GT', { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span className="citas-card-patient">
                        {cita.paciente_nombre || `Paciente DPI: ${cita.id_paciente}`}
                      </span>
                    </div>
                    <div className="citas-card-body">
                      <p><strong>Doctor:</strong> {cita.doctor_encargado}</p>
                      <p><strong>Clínica:</strong> {cita.codigo_clinica || 'No especificado'}</p>
                      <p><strong>Monto:</strong> Q{Number(cita.monto_a_cobrar || 0).toFixed(2) || '0.00'}</p>
                    </div>
                    <div className="citas-card-actions">
                      <button 
                        className="citas-btn-edit"
                        onClick={() => navigate(`/programarcita/${cita.id_cita}`)}>
                        Editar
                      </button>
                      <button 
                        className="citas-btn-delete"
                        onClick={() => handleDelete(cita.id_cita)}>
                        Eliminar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="citas-search-noresults">
              {displayTerm ? 'No se encontraron citas con ese criterio' : 'No hay citas registradas'}
            </div>
          )}
        </div>

        {/* ——— Botones de acción ——— */}
        <div className="citas-form-buttons">
          <button 
            type="button" 
            className="citas-btn-back" 
            onClick={() => navigate(-1)}
            disabled={isLoading}>
            REGRESAR
          </button>
          <button 
            type="button" 
            className="citas-btn-add" 
            onClick={() => navigate('/programarcita')}
            disabled={isLoading}>
            AGREGAR CITA
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default Citas;
