import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './agregarempleado.css';

function AgregarEmpleado() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('informacion');

  const tabConfig = [
    { id: 'listadoMaterial', label: 'Listado de Empleados', path: '/empleados' },
    { id: 'agregarempleado', label: 'Agregar Nuevo Empleado', path: '/agregarempleado' },
    { id: 'empleadocontacto', label: 'Contacto Nuevo Empleado', path: '/EmplecContac' },

  ];

  const slideVariants = {
    initial:    { x: '100%',  opacity: 0 },
    animate:    { x:   0,     opacity: 1 },
    exit:       { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 },
  };

  return (
    <div className="empleinfo-container">
      <h2 className="empleinfo-title">Empleados</h2>
      <hr />

      {/* Tabs de navegación */}
      <nav className="empleinfo-tabs" aria-label="Secciones de Empleados">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`empleinfo-tab ${window.location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}>
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Contenido animado */}
      <motion.section
        initial={slideVariants.initial}
        animate={slideVariants.animate}
        exit={slideVariants.exit}
        transition={slideVariants.transition}
        className="tab-content"
      >
        <div className="AgregarEmple-container2">
          <div className="AgregarEmple-circle">
            <img src="/imagenes/Trabajador.png" alt="Proveedor" className="AgregarEmple-image" />
          </div>
          <div className="AgregarEmple-text">
            <h2 className='TituloAgregarEmple'>Informacion Empleado</h2>
          </div>
        </div>
        <hr className='hringreso' />

        {activeTab === 'informacion' && (
          <div className="agregar-empleado-form grid-2cols">
            {/* Columna Izquierda */}
            <div className="col">
              <div className="field">
                <label htmlFor="agregar-empleado-dpi">DPI:</label>
                <input type="text" id="agregar-empleado-dpi" className="agregar-empleado-input" />
              </div>
              <div className="field">
                <label htmlFor="agregar-empleado-fecha-nacimiento">Nacimiento:</label>
                <input type="date" id="agregar-empleado-fecha-nacimiento" className="agregar-empleado-input" />
              </div>
              <div className="field">
                <label htmlFor="agregar-empleado-direccion">Dirección:</label>
                <input type="text" id="agregar-empleado-direccion" className="agregar-empleado-input" />
              </div>
              <div className="field">
                <label htmlFor="agregar-empleado-clinica">Clínica:</label>
                <input type="text" id="agregar-empleado-clinica" className="agregar-empleado-input" />
              </div>
              <div className="field time-field">
                <label htmlFor="agregar-empleado-hora-inicio">Inicio:</label>
                <input type="time" id="agregar-empleado-hora-inicio" className="agregar-empleado-input" />
              </div>
            </div>

            {/* Columna Derecha */}
            <div className="col">
              <div className="field">
                <label htmlFor="agregar-empleado-nombre">Nombre:</label>
                <input type="text" id="agregar-empleado-nombre" className="agregar-empleado-input" />
              </div>
              <div className="field">
                <label htmlFor="agregar-empleado-apellido">Apellido:</label>
                <input type="text" id="agregar-empleado-apellido" className="agregar-empleado-input" />
              </div>
              <div className="field">
                <label htmlFor="agregar-empleado-edad">Edad:</label>
                <input type="number" id="agregar-empleado-edad" className="agregar-empleado-input" />
              </div>
              <div className="field">
                <label htmlFor="agregar-empleado-cargo">Cargo:</label>
                <input type="text" id="agregar-empleado-cargo" className="agregar-empleado-input" />
              </div>
              <div className="field time-field">
                <label htmlFor="agregar-empleado-hora-salida">Salida:</label>
                <input type="time" id="agregar-empleado-hora-salida" className="agregar-empleado-input" />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'contacto' && (
          <>
            <div className="agregar-empleado-form grid-2cols">
              <div className="col">
                <div className="field">
                  <label htmlFor="agregar-empleado-telmovil1">Móvil 1:</label>
                  <input type="text" id="agregar-empleado-telmovil1" className="agregar-empleado-input" />
                </div>
                <div className="field">
                  <label htmlFor="agregar-empleado-telcasa">Casa:</label>
                  <input type="text" id="agregar-empleado-telcasa" className="agregar-empleado-input" />
                </div>
                <div className="field">
                  <label htmlFor="agregar-empleado-turnos">Turnos:</label>
                  <input type="text" id="agregar-empleado-turnos" className="agregar-empleado-input" />
                </div>
              </div>
              <div className="col">
                <div className="field">
                  <label htmlFor="agregar-empleado-telmovil2">Móvil 2:</label>
                  <input type="text" id="agregar-empleado-telmovil2" className="agregar-empleado-input" />
                </div>
                <div className="field">
                  <label htmlFor="agregar-empleado-correo">Correo:</label>
                  <input type="email" id="agregar-empleado-correo" className="agregar-empleado-input" />
                </div>
              </div>
            </div>
            

            <div className="ingreEMPLEADO-form-buttons">
              <button type="button" className="ingreEMPLEADO-btn-delete">ELIMINAR</button>
              <button type="button" className="ingreEMPLEADO-btn-edit" onClick={() => navigate('/ingresoMaterial')}>MODIFICAR</button>
              <button type="button" className="ingreEMPLEADO-btn-add" onClick={() => navigate('/ingresoMaterial')}>AGREGAR</button>
              <button type="button" className="ingreEMPLEADO-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
            </div>
          </>
        )}
      </motion.section>
    </div>
  );
}

export default AgregarEmpleado;
