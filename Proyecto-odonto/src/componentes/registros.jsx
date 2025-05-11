import React, { useState, useEffect } from 'react'; 
import './registros.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Registros() {
    const navigate = useNavigate();

  const tabConfig = [
     { id: "agregarpaciente", label: "Información de paciente", path: "/agregarpaciente" },
     { id: "pacientes", label: "Hábitos", path: "/habitos" },
     { id: "historialodontologico", label: "Historial Odontológico", path: "/historialodontologico" },
     { id: "historialmedico", label: "Historial Médico", path: "/historialmedico" },
     { id: "fotografias", label: "Fotografías", path: "/fotografias" },      
     { id: "tratamiento", label: "Tratamiento", path: "/tratamiento1" },
    ];

 const tabVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit:    { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/pacientes');
  }

  return (
    <main className="formulario-content5">
      <h1 className="titulos-pacientes5">Pacientes</h1>
      <div className="formulario-header5">
        <div className="circulo5-">
          <img src="/imagenes/iconoUsuario.png" alt="icono usuario" className="icono-usuario1" />
        </div>
        <h2>[nombre]</h2>
      </div>

      <nav className="tabs6">
      {tabConfig.map((tab) => (
      <button
      key={tab.id}
      onClick={() => navigate(tab.path)}
      className={location.pathname === tab.path ? "active" : ""} // Resaltado dinámico
      >
      {tab.label}
      </button>
        ))}
      </nav>
      <motion.section  
        className="form-grid5"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}
      >
<div className="seccion-doble4"> 
    <div className="triple5">
        <h3 className="titulo-triple5">Registro ARS</h3>
        <div className="camposs4">
            <label>Fecha:</label>
            <input type="text" />
        </div>
        <div className="camposs4">
            <label>Pieza:</label>
            <input type="text" />
        </div>
    </div>

    <div className="uno5">
        <h3 className="titulo-uno5">Registro Stripping</h3>
        <div className="camposs4">
            <label>Fecha:</label>
            <input type="text" />
        </div>
        <div className="camposs4">
            <label>Pieza:</label>
            <input type="text" />
        </div>
    </div>

    <div className="dos5">
        <h3 className="titulo-dos5">Registro Readhesiones</h3>
        <div className="camposs4">
            <label>Fecha:</label>
            <input type="text" />
        </div>
        <div className="camposs4">
            <label>Pieza:</label>
            <input type="text" />
        </div>
    </div>
</div>

      <div className="acciones-formulario4">
          <button type="button" onClick={() => navigate('/tratamiento1')} className="btn-regresar">REGRESAR</button>
          <button type="button" className="btn-editar">EDITAR</button>
          <button type="submit" className="btn-guardar">GUARDAR</button>
      </div>
      </motion.section>
    </main>
  );
}

export default Registros;