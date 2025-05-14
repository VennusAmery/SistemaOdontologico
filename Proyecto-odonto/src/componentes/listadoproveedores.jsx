// src/componentes/listadoproveedores.js
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './ListadoProveedores.css';

const tabsProveedores = [
  { id: 'listadoProveedores', label: 'Listado de Proveedores', path: '/listadoProveedores' },
  { id: 'ingresoProveedores', label: 'Ingreso de Proveedores', path: '/proveedores' },
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

  // Datos reales desde API
  const [proveedores, setProveedores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');

  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');

  // Traer proveedores al montar
useEffect(() => {
const fetchProveedores = async () => {
  try {
    const res = await axios.get('http://localhost:4000/api/proveedores');
    console.log(res.data);  // Para verificar que los datos están llegando correctamente.
    setProveedores(res.data);
  } catch (error) {
    console.error("Error al obtener la lista de proveedores:", error);
  }
};
  fetchProveedores();
}, []);

  // Filtrado y agrupamiento
  const proveedoresFiltrados = useMemo(() =>
    proveedores.filter(p =>
      p.nombre.toLowerCase().includes(displayTerm.toLowerCase())
    )
  , [proveedores, displayTerm]);

const agrupados = useMemo(() => {
  return proveedoresFiltrados
    .filter(prov => typeof prov.nombre === 'string' && prov.nombre.length > 0)
    .sort((a, b) => a.nombre.localeCompare(b.nombre))
    .reduce((acc, prov) => {
      const letra = prov.nombre[0].toUpperCase();
      if (!acc[letra]) acc[letra] = [];
      acc[letra].push(prov);
      return acc;
    }, {});
}, [proveedoresFiltrados]);



  // Handlers
  const handleTabClick = tab => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  const handleSearch = e => {
    e.preventDefault();
    setDisplayTerm(searchTerm);
  };

  // Render
  return (
    <div className="listprov-container">
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
        <form className="LISTPROV-search-form" onSubmit={handleSearch}>
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
                  {agrupados[letra].map(prov => (
                    <div
                      key={prov.id_proveedor}
                      className="LISTPROV-search-item"
                      role="button"
                      tabIndex={0}
                      onClick={() => navigate(`/proveedores/${prov.id_proveedor}`)}
                      onKeyDown={e => e.key === 'Enter' && navigate(`/proveedores/${prov.id_proveedor}`)}
                    >
                      {prov.nombre}
                    </div>
                  ))}

              </div>
            ))
          ) : (
            <div className="LISTPROV-search-noresults">No se encontraron proveedores</div>
          )}
        </div>

        {/* Botones */}
        <div className="listprov-form-buttons">
          <button type="button" className="listprov-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
        </div>
      </motion.section>
    </div>
  );
}
