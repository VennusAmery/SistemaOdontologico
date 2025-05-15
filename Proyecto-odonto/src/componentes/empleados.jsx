import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './empleados.css';

const tabConfig = [
  { id: 'listado', label: 'Listado de Empleados', path: '/empleados' },
  { id: 'nuevo',   label: 'Empleados',   path: '/agregarempleado' },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

export default function Empleados() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);

  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');

  // 1️⃣ Lista de empleados del servidor
  const [empleados, setEmpleados] = useState([]);

useEffect(() => {
  fetch('http://localhost:4000/api/empleados')
    .then(res => res.json())
    .then(data => {
      console.log('Respuesta API empleados:', data);
      setEmpleados(Array.isArray(data) ? data : []);
    })
    .catch(err => console.error('Error al cargar empleados:', err));
}, []);

  // 2️⃣ Debounce para la búsqueda
  useEffect(() => {
    const timeout = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm]);

  // 3️⃣ Filtrar por nombre o apellido
  const filtrados = useMemo(() => {
    return empleados.filter(emp => {
      const texto = `${emp.nombre} ${emp.apellido}`.toLowerCase();
      return texto.includes(displayTerm.toLowerCase());
    });
  }, [empleados, displayTerm]);

  // 4️⃣ Agrupar alfabéticamente por la inicial del nombre
  const agrupados = useMemo(() => {
    return filtrados
      .sort((a, b) => a.nombre.localeCompare(b.nombre))
      .reduce((acc, emp) => {
        const letra = emp.nombre[0].toUpperCase();
        acc[letra] = acc[letra] || [];
        acc[letra].push(emp);
        return acc;
      }, {});
  }, [filtrados]);

  const handleTabClick = tab => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  return (
    <div className="emplelist-container">
      <h2 className="emplelist-title">Empleados</h2>
      <hr />

      {/* — Tabs — */}
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
        {/* — Buscador — */}
        <form
          className="emplelist-search-form"
          onSubmit={e => { e.preventDefault(); setDisplayTerm(searchTerm); }}
        >
          <div className="emplelist-search-container">
            <input
              type="text"
              placeholder="Buscar empleado..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="emplelist-search-input"
            />
            <button type="submit" className="emplelist-search-icon">🔍</button>
          </div>
        </form>

        {/* — Resultados — */}
        <div className="emplelist-search-results">
          {filtrados.length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="emplelist-letter-separator">{letra}</div>
                {agrupados[letra].map(emp => (
                  <div
                    key={emp.id}
                    className="emplelist-search-item"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/empleadoinfo/${emp.id}`)}
                    onKeyDown={e => {
                      if (e.key === 'Enter')
                        navigate(`/empleadoinfo/${emp.id}`);
                    }}>
                    {emp.nombre} {emp.apellido}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="emplelist-search-noresults">No se encontraron empleados</div>
          )}
        </div>

        {/* — Botón Regresar — */}
        <div className="emplelist-form-buttons">
          <button
            type="button"
            className="emplelist-btn-back"
            onClick={() => navigate(-1)}
          >
            REGRESAR
          </button>
        </div>
      </motion.section>
    </div>
  );
}
