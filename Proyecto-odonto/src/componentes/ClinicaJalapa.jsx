import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './clinicaJalapa.css';

const tabConfig = [
  { id: 'clinica14', label: 'Clínica Zona 14', path: '/clinica' },
  { id: 'clinicaJalapa', label: 'Clínica Jalapa', path: '/clinicaJalapa' },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

const ClinicaJalapa = () => {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[1].id); // Empezamos con la pestaña 'Clinica Jalapa'

 /*FLASH DE LOS BOTONES DE ABAJO*/ 
  const [flashMessage, setFlashMessage] = useState('');
  const showFlash = (text) => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 3000);  // 3000 ms = 3 segundos
  };
  
  const handleDelete = (e) => {
    e.preventDefault();
    // aquí tu lógica de eliminar...
    showFlash('🗑️ Eliminado correctamente');
  };
  
  const handleEdit = (e) => {
    e.preventDefault();
    // aquí tu lógica de edición...
    showFlash('🖋️ Editado correctamente');
  };
  
  const handleSave = (e) => {
    e.preventDefault();
    // aquí tu lógica de guardado...
    showFlash('💾 Guardado correctamente');
  };


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
            onClick={() => handleTabClick(tab)} >
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
                {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}

                <button type="button" className="clinic-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
                <button onClick={handleDelete} className="clinic-btn-delete">ELIMINAR</button>
                <button onClick={handleEdit} className="clinic-btn-edit">EDITAR</button>
                <button onClick={handleSave} className="clinic-btn-add">GUARDAR</button>
              </div>

      </motion.section>
    </div>
  );
};

export default ClinicaJalapa;
