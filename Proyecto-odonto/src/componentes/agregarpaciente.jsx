import React, { useState } from 'react';
import './agregarpaciente.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function AgregarPaciente() {
  const navigate = useNavigate();
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [activeEncabezado, setActiveEncabezado] = useState('infoPaciente');

  const tabConfig = [
    { id: 'listadoPaciente', label: 'Listado', path: '/pacientes' },
    { id: 'infoPaciente', label: 'Información de paciente', path: '/agregarpaciente' },
    { id: 'habitos', label: 'Hábitos', path: '/habitos' },
    { id: 'historialOdont', label: 'Historial Odontológico', path: '/historialodontologico' },
    { id: 'historialMed', label: 'Historial Médico', path: '/historialmedico' },
    { id: 'fotografias', label: 'Fotografías', path: '/fotografias' },
    { id: 'tratamiento', label: 'Tratamiento', path: '/tratamiento' },
  ];

  const tabVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 }
  };

  /* FLASH DE LOS BOTONES DE ABAJO */
  const [flashMessage, setFlashMessage] = useState('');
  const showFlash = text => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 3000);
  };

  const handleDelete = e => {
    e.preventDefault();
    showFlash('🗑️ Eliminado correctamente');
  };
  const handleEdit = e => {
    e.preventDefault();
    showFlash('🖋️ Editado correctamente');
  };
  const handleSave = e => {
    e.preventDefault();
    showFlash('💾 Guardado correctamente');
  };
  const handleSubmit = e => {
    e.preventDefault();
    showFlash('💾 Guardado correctamente');
  };

  return (
    <main className="formulario-content">

      <h2 className="agregarpaciente-title">Pacientes</h2>
      <hr className="agregarpaciente-hr" />

      <nav className="agregarpaciente-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`agregarpaciente-tab ${activeEncabezado === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveEncabezado(tab.id);
              navigate(tab.path);
            }}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="form-grid"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}>

        <div className="agregarpaciente-container2">
          <div className="agregarpaciente-circle">
            <img src="/imagenes/paciente.png" alt="Proveedor" className="agregarpaciente-image" />
          </div>
          <div className="agregarpaciente-text">
            <h2 className="agregarpaciente-header-title">Información Pacientes</h2>
          </div>
        </div>
        <hr className="agregarpaciente-separator" />


        <form onSubmit={handleSubmit}>
          <div className="triple">
            <div className="campos">
              <label>DPI:</label>
              <input type="text" />
            </div>
            <div className="campos">
              <label>Nombre:</label>
              <input type="text" />
            </div>
            <div className="campos">
              <label>Apellido:</label>
              <input type="text" />
            </div>
          </div>

          <div className="cuatro">
            <div className="campos">
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
                className={`input-fecha ${fechaNacimiento ? "has-value" : ""}`} />
            </div>
            <div className="campos">
              <label>Edad:</label>
              <input type="number" />
            </div>
            <div className="campos">
              <label>Sexo:</label>
              <input type="text" />
            </div>
            <div className="campos">
              <label>Estado Civil:</label>
              <input type="text" />
            </div>
          </div>

          <div className="doble">
            <div className="campos">
              <label>Correo Electrónico:</label>
              <input type="email" />
            </div>
            <div className="campos">
              <label>Ocupación:</label>
              <input type="tel" />
            </div>
          </div>

          <div className="triple2">
            <div className="campos">
              <label>Teléfono Móvil:</label>
              <input type="text" />
            </div>
            <div className="campos">
              <label>Teléfono Fijo:</label>
              <input type="tel" />
            </div>
            <div className="campos">
              <label>Teléfono Trabajo:</label>
              <input type="text" />
            </div>
          </div>

          <div className="doble2">
            <div className="campos">
              <label>Dirección:</label>
              <input type="text" />
            </div>
            <div className="campos">
              <label>Dirección Trabajo:</label>
              <input type="tel" />
            </div>
          </div>

          <div className="wide">
            <div className="campos">
              <label>Motivo de Consulta:</label>
              <input type="text" />
            </div>
          </div>

          <div className="mayoria-edad">
            <label>Mayoría de Edad:</label>
            <label><input type="radio" name="mayoria" value="si" /> Sí</label>
            <label><input type="radio" name="mayoria" value="no" /> No</label>
          </div>

            <div className="agregarpaciente-buttons">

              {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}

              <button type="button" className="agregarpaciente-btn regresar" onClick={() => navigate(-1)}>REGRESAR</button>
              <button type="button" className="agregarpaciente-btn eliminar" onClick={handleDelete}>ELIMINAR</button>
              <button type="button" className="agregarpaciente-btn editar" onClick={handleEdit}>EDITAR</button>
              <button type="button" className="agregarpaciente-btn guardar" onClick={handleSave}>GUARDAR</button>
            </div>

        </form>
      </motion.section>
    </main>
  );
}

export default AgregarPaciente;
