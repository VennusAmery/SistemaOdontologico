import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './agregarempleado.css';

function AgregarEmpleado() {
  const navigate = useNavigate();

  const tabConfig = [
    { id: 'listadoMaterial', label: 'Listado de Empleados', path: '/empleados' },
    { id: 'ingresoMaterial', label: 'Agregar Nuevo Empleado', path: '/agregarempleado' },
  ];

  const [tabActiva, setTabActiva] = useState(tabConfig[1].id);

  const handleTabClick = tab => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const slideVariants = {
    initial:    { x: '100%',  opacity: 0 },
    animate:    { x:   0,     opacity: 1 },
    exit:       { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 },
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

  /* Listas de teléfonos y correos */
  const [phoneList] = useState([
    '555-1234', '555-5678', '555-8765'
  ]);
  const [emailList] = useState([
    'juan@example.com',
    'maria@example.com',
    'sofia@example.com',
  ]);

  return (
    <div className="empleinfo-container">
      <h2 className="empleinfo-title">Empleados</h2>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="empleinfo-tabs" aria-label="Secciones de Empleados">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`empleinfo-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        initial={slideVariants.initial}
        animate={slideVariants.animate}
        exit={slideVariants.exit}
        transition={slideVariants.transition}
        className="tab-content"
      >
        <div className="AgregarEmple-container2">
          <div className="AgregarEmple-circle">
            <img
              src="/imagenes/Trabajador.png"
              alt="Trabajador"
              className="AgregarEmple-image"
            />
          </div>
          <div className="AgregarEmple-text">
            <h2 className="TituloAgregarEmple">
              Información del Empleado
            </h2>
          </div>
        </div>
        <hr className="hringreso" />

        <div className="agregar-empleado-form grid-2cols">
          <div className="col">
            <div className="field">
              <label htmlFor="dpi">DPI:</label>
              <input type="text" id="dpi" className="agregar-empleado-input" />
            </div>
            <div className="field">
              <label htmlFor="fecha-nacimiento">Nacimiento:</label>
              <input
                type="date"
                id="fecha-nacimiento"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="direccion">Dirección:</label>
              <input
                type="text"
                id="direccion"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="clinica">Clínica:</label>
              <input
                type="text"
                id="clinica"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field time-field">
              <label htmlFor="hora-inicio">Inicio:</label>
              <input
                type="time"
                id="hora-inicio"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="telefono">Teléfono:</label>
              <select name="telefono" className="agregar-empleado-select">
                <option value="">— Seleccione —</option>
                {phoneList.map(num => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="correoElectronico">Correo:</label>
              <select
                name="correoElectronico"
                className="agregar-empleado-select"
              >
                <option value="">— Seleccione —</option>
                {emailList.map(email => (
                  <option key={email} value={email}>
                    {email}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="col">
            <div className="field">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="edad">Edad:</label>
              <input
                type="number"
                id="edad"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="cargo">Cargo:</label>
              <input
                type="text"
                id="cargo"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field time-field">
              <label htmlFor="hora-salida">Salida:</label>
              <input
                type="time"
                id="hora-salida"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="turno">Turno:</label>
              <input
                type="text"
                id="turno"
                className="agregar-empleado-input"
              />
            </div>
            <div className="field">
              <label htmlFor="sueldo">Sueldo:</label>
              <input
                type="text"
                id="sueldo"
                className="agregar-empleado-input"
              />
            </div>
          </div>
        </div>

        <div className="ingreEMPLEADO-form-buttons">

          {flashMessage && (
            <div className="flash-message">{flashMessage}</div>)}

          <button type="button" className="ingreEMPLEADO-btn-delete" onClick={handleDelete} > ELIMINAR</button>
          <button type="button" className="ingreEMPLEADO-btn-edit" onClick={handleEdit}> EDITAR</button>
          <button type="button" className="ingreEMPLEADO-btn-add" onClick={handleSave}> AGREGAR</button>
          <button type="button" className="ingreEMPLEADO-btn-back" onClick={() => navigate(-1)}> REGRESAR</button>
        </div>
      </motion.section>
    </div>
  );
}

export default AgregarEmpleado;
