import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Listdoctores.css';

const tabsDoctores = [
  { id: 'listadoDoctores', label: 'Listado de Doctores', path: '/listdoctores' },
  { id: 'registroDoctor', label: 'Información Doctor', path: '/doctores' },
];

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

export default function ListDoctores() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabsDoctores[0].id);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  const [doctores, setDoctores] = useState([]);

  // Cargar doctores desde backend
  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const res = await fetch('http://localhost:4000/api/listadodoctores');
        const data = await res.json();
        if (Array.isArray(data)) {
          setDoctores(data);
        } else {
          console.error('Respuesta inesperada del backend:', data);
        }
      } catch (err) {
        console.error('Error al cargar doctores:', err);
      }
    };
    fetchDoctores();
  }, []);

  // Debounce
  useEffect(() => {
    const id = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(id);
  }, [searchTerm]);

  // Filtrar doctores
  const filtrados = useMemo(
    () =>
      doctores.filter(doc =>
        doc.nombre.toLowerCase().includes(displayTerm.toLowerCase())
      ),
    [doctores, displayTerm]
  );

  // Agrupar alfabéticamente
  const agrupados = useMemo(() => {
    return filtrados
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .reduce((acc, item) => {
        const letra = item.nombre[0].toUpperCase();
        if (!acc[letra]) acc[letra] = [];
        acc[letra].push(item);
        return acc;
      }, {});
  }, [filtrados]);


  const handleDoctorClick = (id) => {
    navigate(`/ingresodoctor/${id}`);
  };

  const handleTabClick = (tab) => {
  setTabActiva(tab.id);
  if (tab.path.includes(':id')) return; // Para evitar navegación a ruta inválida
  navigate(tab.path);
};


  return (
    <div className="Listdoc-container">
      <h2 className="Listdoc-title">Contactos</h2>
      <hr />

      {/* Tabs */}
      <nav className="Listdoc-tabs" aria-label="Secciones de Doctores">
        {tabsDoctores.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`Listdoc-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="Listdoc-search-section"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}>

        {/* Buscador */}
        <form
          className="Listdoc-search-form"
          onSubmit={e => {
            e.preventDefault();
            setDisplayTerm(searchTerm);
          }}>
          <div className="Listdoc-search-container">
            <input
              type="text"
              className="Listdoc-search-input"
              placeholder="Buscar doctor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)} />
            <button type="submit" className="Listdoc-search-icon" aria-label="Buscar">🔍</button>
          </div>
        </form>

        {/* Resultados */}
        <div className="Listdoc-search-results">
          {filtrados.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="Listdoc-letter-separator">{letra}</div>
                {agrupados[letra].map(item => (
                  <div
                    key={item.id}
                    className="Listdoc-search-item"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleDoctorClick(item.id)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleDoctorClick(item.id);
                    }}>
                    {item.nombre}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="Listdoc-search-noresults">No se encontraron doctores</div>
          )}
        </div>

        {/* Botones */}
        <div className="Listdoc-form-buttons">
          <button type="button" className="Listdoc-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
        </div>
      </motion.section>
    </div>
  );
}
