import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './clinica.css';

const tabConfig = [
  { id: 'clinica14', label: 'Clínica Zona 14', path: '/clinicaZona14' },
  { id: 'clinicaJalapa', label: 'Clínica Jalapa', path: '/clinicaJalapa' },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

const Clinica = () => {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);

  const handleNavigation = () => navigate(-1);
  const handleEliminar = () => alert('Eliminar clínica');
  const handleEditar = () => alert('Editar clínica');
  const handleGuardar = () => alert('Guardar clínica');

  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const renderFormularioClinica = (titulo) => (
    <div className="clinica-bloque">
      <h2 className="clinica-titulo">{titulo}</h2>
      <div className="clinica-fila">
        <div className="clinica-columna-izquierda">
          <label>Nombre:</label>
          <input type="text" className="clinica-input" />
          <label>Ubicación:</label>
          <input type="text" className="clinica-input" />
          <label>Correo:</label>
          <input type="email" className="clinica-input" />
          <label>Teléfono:</label>
          <input type="tel" className="clinica-input" />
        </div>

        <div className="clinica-columna-derecha">
          <label>Hora Apertura:</label>
          <input type="time" className="clinica-input horario-input" />
          <label>Hora Cierre:</label>
          <input type="time" className="clinica-input horario-input" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="clinica-contenedor">
      <h2 className="clinica-encabezado">Clínicas</h2>
      <hr />

      {/* ——— Tabs de navegación ——— */}
      <nav className="inv-tabs" aria-label="Secciones de Clínica">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`inv-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="clinica-formulario"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >
        {/* ——— Formularios según la pestaña activa ——— */}
        {tabActiva === 'clinica14' && renderFormularioClinica('Clínica Zona 14 Guatemala')}
        {tabActiva === 'clinicaJalapa' && renderFormularioClinica('Clínica Jalapa')}

        {/* ——— Botones de acción ——— */}
        <div className="clinic-form-buttons">
          <button type="button" className="clinic-btn-back"onClick={() => navigate(-1)}>REGRESAR </button>
          <button onClick={handleEliminar} className="clinic-btn-delete">ELIMINAR</button>
          <button onClick={handleEditar} className="clinic-btn-edit">EDITAR</button>
          <button onClick={handleGuardar} className="clinic-btn-add">GUARDAR</button>
        </div>

      </motion.section>
    </div>
  );
};

export default Clinica;
