import React from 'react';
import './agregarpaciente.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

function AgregarPaciente() {
    const navigate = useNavigate();
    const [fechaNacimiento, setFechaNacimiento] = useState("");

  const tabConfig = [
     { id: "agregarpaciente", label: "Información de paciente", path: "/agregarpaciente" },
     { id: "pacientes", label: "Hábitos", path: "/habitos" },
     { id: "historialodontologico", label: "Historial Odontológico", path: "/historialodontologico" },
     { id: "historialmedico", label: "Historial Médico", path: "/historialmedico" },
     { id: "fotografias", label: "Fotografías", path: "/fotografias" },      
     { id: "tratamiento", label: "Tratamiento", path: "/tratamiento" },
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
    <main className="formulario-content">
      <h1 className="titulos-pacientes">Pacientess</h1>
      <div className="formulario-header">
        <div className="circulo-">
          <img src="/imagenes/iconoUsuario.png" alt="icono usuario" className="icono-usuario" />
        </div>
        <h2>[nombre]</h2>
      </div>

      <nav className="tabs1">
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
        className="form-grid"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}
      >
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
          <input type="date"
        
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
        <div className="campos ">
          <label>Correo Electrónico:</label>
          <input  type="email" />
        </div>
        <div className="campos">
          <label>Ocupacion:</label>
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

      <div className="acciones-formulario">
          <button type="button" onClick={() => navigate('/pacientes')} className="btn-regresar">REGRESAR</button>
          <button type="button" className="btn-editar">EDITAR</button>
          <button type="submit" className="btn-guardar">GUARDAR</button>
      </div>

        </form>
      </motion.section>
    </main>
  );
}

export default AgregarPaciente;
