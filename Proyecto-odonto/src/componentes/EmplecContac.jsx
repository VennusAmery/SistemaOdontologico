import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './EmplecContac.css';        // coincide con el nombre real del archivo

function EmplecContac() {          // empieza con mayúscula
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('contacto');

  const slideVariants = {
    initial:    { x: '100%',  opacity: 0 },
    animate:    { x: 0,       opacity: 1 },
    exit:       { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 },
  };

  const tabConfig = [
    { id: 'listadoMaterial', label: 'Listado de Empleados', path: '/empleados' },
    { id: 'agregarempleado', label: 'Agregar Nuevo Empleado', path: '/agregarempleado' },
    { id: 'empleadocontacto', label: 'Contacto Nuevo Empleado', path: '/EmplecContac' },
  ];

  return (
    <div className="empleadocontacto-container">
      <h2 className="empleadocontacto-title">Empleados</h2>
      <hr />

      {/* Tabs de navegación */}
      <nav className="empleadocontacto-tabs" aria-label="Secciones de Empleados">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`empleadocontacto-tab ${window.location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
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
        
        className="empleadocontacto-content">

<div className="ContacEmple-container2">
          <div className="ContacEmple-circle">
            <img src="/imagenes/Trabajador.png" alt="Proveedor" className="ContacEmple-image" />
          </div>
          <div className="ContacEmple-text">
            <h2 className='ContacEmple'>Informacion Empleado</h2>
          </div>
        </div>
        <hr className='hringreso' />


        {activeTab === 'contacto' && (
          <div className="empleadocontacto-form">
            <div className="empleadocontacto-grid">
              {/* Columna izquierda */}
              <div className="empleadocontacto-col">
                <div className="empleadocontacto-field">
                  <label>Telefono Movil:</label>
                  <input type="text" />
                </div>
                <div className="empleadocontacto-field">
                  <label>Telefono Casa:</label>
                  <input type="text" />
                </div>
                <div className="empleadocontacto-field">
                  <label>Turnos:</label>
                  <textarea />
                </div>
              </div>

              {/* Columna derecha */}
              <div className="empleadocontacto-col">
                <div className="empleadocontacto-field">
                  <label>Telefono Movil:</label>
                  <input type="text" />
                </div>
                <div className="empleadocontacto-field">
                  <label>Correo Electronico:</label>
                  <input type="email" />
                </div>
              </div>
            </div>

            <div className="empleadocontacto-buttons">
              <button className="empleadocontacto-btn regresar" onClick={() => navigate(-1)}>REGRESAR</button>
              <button className="empleadocontacto-btn eliminar">ELIMINAR</button>
              <button className="empleadocontacto-btn editar">EDITAR</button>
              <button className="empleadocontacto-btn guardar">GUARDAR</button>
            </div>
          </div>
        )}
      </motion.section>
    </div>
  );
}

export default EmplecContac;
