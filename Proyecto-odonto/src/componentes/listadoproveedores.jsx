import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ListadoProveedores.css';

const tabsProveedores = [
  { id: 'listadoProveedores', label: 'Listado de Proveedores', path: '/listadoProveedores' },
  { id: 'ingresoProveedores', label: 'Ingreso de Proveedores', path: '/Proveedores' },
];

const slideVariants = {
  initial:    { x: '100%', opacity: 0 },
  animate:    { x: 0,      opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

export default function ListadoProveedores() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(tabsProveedores[0].id);

  // Proveedores simulados
  const [proveedores] = useState([
    'Avenida', 'TomatosFans', 'Medicina', 'Jorge', 'Chuwi',
    'Chipus', 'Arriba', 'Barniz', 'Terminales', 'Selladores'
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');

  // Mensaje flash
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');


  // Filtrado
  const proveedoresFiltrados = useMemo(
    () =>
      proveedores.filter(nombre =>
        nombre.toLowerCase().includes(displayTerm.toLowerCase())
      ),
    [proveedores, displayTerm]
  );

  // Agrupamiento alfabético
  const agrupados = useMemo(() => {
    return proveedoresFiltrados
      .sort((a, b) => a.localeCompare(b))
      .reduce((acc, item) => {
        const letra = item[0].toUpperCase();
        if (!acc[letra]) acc[letra] = [];
        acc[letra].push(item);
        return acc;
      }, {});
  }, [proveedoresFiltrados]);

  const handleTabClick = tab => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="listprov-container">

      {/* Flash message arriba */}
      <AnimatePresence>
        {message && (
          <motion.div
            className={`flash-message ${messageType}`}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -40, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>

      <h2>Contactos</h2>
      <hr className='listprovhr' />

      {/* Tabs */}
      <nav className="listprov-tabs" aria-label="Secciones de Proveedores">
        {tabsProveedores.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`listprov-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="LISTPROV-search-section"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >

        {/* Buscador */}
        <form
          className="LISTPROV-search-form"
          onSubmit={e => {
            e.preventDefault();
            setDisplayTerm(searchTerm);
          }}
        >
          <div className="LISTPROV-search-container">
            <input
              type="text"
              className="LISTPROV-search-input"
              placeholder="Buscar proveedor..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="LISTPROV-search-icon" aria-label="Buscar">🔍</button>
          </div>
        </form>

        {/* Resultados */}
        <div className="LISTPROV-search-results">
          {proveedoresFiltrados.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="LISTPROV-letter-separator">{letra}</div>
                {agrupados[letra].map(item => (
                  <div
                    key={item}
                    className="LISTPROV-search-item"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/infoMaterial/${encodeURIComponent(item)}`)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') navigate(`/infoMaterial/${encodeURIComponent(item)}`);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="LISTPROV-search-noresults">No se encontraron proveedores</div>
          )}
        </div>

        {/* Botones de acción */}
        <div className="listprov-form-buttons">
          <button type="button" className="listprov-btn-back" onClick={() => navigate(-1)}> REGRESAR</button>
        </div>
      </motion.section>
    </div>
  );
}
