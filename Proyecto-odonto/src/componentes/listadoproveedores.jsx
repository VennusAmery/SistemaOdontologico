/* listadoproveedores */
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ListadoProveedores.css';

const tabsProveedores = [
  { id: 'listadoProveedores', label: 'Listado de Proveedores', path: '/listadoProveedores' },
];

const animacionesSlide = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

export default function ListadoProveedores() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabsProveedores[0].id);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');
  const [terminoFiltrado, setTerminoFiltrado] = useState('');
  const [proveedores] = useState([
    'Distribuidora Médica', 'Proveedor X', 'Insumos Norte', 'Salud Central', 'BioEquipos'
  ]);

  useEffect(() => {
    const id = setTimeout(() => setTerminoFiltrado(terminoBusqueda), 300);
    return () => clearTimeout(id);
  }, [terminoBusqueda]);

  const proveedoresFiltrados = useMemo(
    () =>
      proveedores.filter(nombre =>
        nombre.toLowerCase().includes(terminoFiltrado.toLowerCase())
      ),
    [proveedores, terminoFiltrado]
  );

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
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="prov-container">
          <h2>Contactos</h2>
          <hr className="provlis-separator" />
          <hr className="prov-separator" />

              <div className="prov-container2">
          <div className="prov-circle">
            <img src="/imagenes/proveedores.png" alt="Proveedor" className="prov-image"/>
          </div>
          <div className="prov-text">
            <h2 className="prov-title">Proveedores</h2>
            </div>
            <hr />
            </div>

      <nav className="prov-tabs" aria-label="Secciones de Proveedores">
        {tabsProveedores.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`prov-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="prov-search-section"
        variants={animacionesSlide}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={animacionesSlide.transition}
      >
        <form
          className="prov-search-form"
          onSubmit={e => {
            e.preventDefault();
            setTerminoFiltrado(terminoBusqueda);
          }}
        >
          <div className="prov-search-container">
            <input
              type="text"
              className="prov-search-input"
              placeholder="Buscar proveedor..."
              value={terminoBusqueda}
              onChange={e => setTerminoBusqueda(e.target.value)}
            />
            <button type="submit" className="prov-search-icon" aria-label="Buscar">
              🔍
            </button>
          </div>
        </form>

        <div className="prov-search-results">
          {proveedoresFiltrados.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="prov-letter-separator">{letra}</div>
                {agrupados[letra].map(item => (
                  <div key={item} className="prov-search-item">
                    {item}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="prov-search-noresults">No se encontraron proveedores</div>
          )}
        </div>

        <div className="prov-form-buttons">
          <button type="button" className="prov-btn-delete">ELIMINAR</button>
          <button type="button" className="prov-btn-edit" onClick={() => navigate('/roveedores')}>MODIFICAR</button>
          <button type="button" className="prov-btn-add" onClick={() => navigate('/Proveedores')}>AGREGAR</button>
          <button type="button" className="prov-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
        </div>
      </motion.section>
    </div>
  );
}
