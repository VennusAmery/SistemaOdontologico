// ProgramarCita.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './programarcita.css';

function ProgramarCita() {
  const navigate = useNavigate();
  const location = useLocation();
  const [flashMessage, setFlashMessage] = useState('');

  const tabConfig = [
    { id: 'listadoMaterial', label: 'Historial Citas',   path: '/citas' },
    { id: 'nuevaCita',       label: 'Nueva Cita',         path: '/programarcita' },
  ];

  const slideVariants = {
    initial:    { x: '100%',  opacity: 0 },
    animate:    { x:   0,     opacity: 1 },
    exit:       { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 },
  };

  const showFlash = text => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 3000);
  };
  const handleDelete  = e => { e.preventDefault(); showFlash('🗑️ Eliminado correctamente'); };
  const handleEdit    = e => { e.preventDefault(); showFlash('🖋️ Editado correctamente'); };
  const handleSave    = e => { e.preventDefault(); showFlash('💾 Guardado correctamente'); };
  const handleConfirm = e => { e.preventDefault(); showFlash('✅ Confirmado correctamente'); };

  return (
    <div className="programarcita-content">
      <h1 className="programarcita-titulo">Citas</h1>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="programarcita-tabs" aria-label="Secciones de Citas">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`programarcita-tab ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="programarcita-section"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
      >
        <form className="programarcita-formulario">
          <div className="programarcita-form-grid">
            {/* Columna 1 */}
            <div>
              <label htmlFor="dpi">DPI Paciente:</label>
              <input type="text" id="dpi" name="dpi" />

              <label htmlFor="doctor">Doctor encargado:</label>
              <input type="text" id="doctor" name="doctor" />

              <label htmlFor="fecha">Fecha:</label>
              <input type="date" id="fecha" name="fecha" />
            </div>

            {/* Columna 2 */}
            <div>
              <label htmlFor="codigoClinica">Código Clínica:</label>
              <input type="text" id="codigoClinica" name="codigoClinica" />

              <label htmlFor="hora">Hora:</label>
              <input type="time" id="hora" name="hora" />

              <label htmlFor="monto">Monto a Cobrar:</label>
              <input type="number" id="monto" name="monto" />
            </div>

            {/* Grupo de radios ocupando ambas columnas */}
            <div className="programarcita-mayoria-edad" style={{ gridColumn: '1 / -1' }}>
              <span>Mayoría de Edad:</span>
              <label htmlFor="mayoriaSi">
                <input type="radio" id="mayoriaSi" name="mayoria" value="si" /> Sí
              </label>
              <label htmlFor="mayoriaNo">
                <input type="radio" id="mayoriaNo" name="mayoria" value="no" /> No
              </label>
            </div>
          </div>

          <div className="programarcita-botones">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            <button type="button" className="programarcita-btn-guardar" onClick={handleSave}>
              GUARDAR
            </button>
            <button type="button" className="programarcita-btn-confirmar" onClick={handleConfirm}>
              CONFIRMAR
            </button>
            <button type="button" className="programarcita-btn-editar" onClick={handleEdit}>
              EDITAR
            </button>
            <button type="button" className="programarcita-btn-eliminar" onClick={handleDelete}>
              ELIMINAR
            </button>
            <button type="button" className="programarcita-btn-regresar" onClick={() => navigate('/citas')}>
              REGRESAR
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}

export default ProgramarCita;
