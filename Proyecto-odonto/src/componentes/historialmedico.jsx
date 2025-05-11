import React, { useState, useEffect } from 'react'; 
import './historialmedico.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Historialmedico() {
    const navigate = useNavigate();
    const [dpiPaciente, setDpiPaciente] = useState("");
    const [fecharegistro, setFechaRegistro] = useState("");

/*esto es solo ejemplo, se debe eliminar y usar el valor real de la API*/
    useEffect(() => {
      // Simulación de llamada a una API para obtener el DPI
      const fetchDpi = async () => {
        const fetchedDpi = "1234567890101"; // Valor obtenido de la API
        setDpiPaciente(fetchedDpi); // Actualiza el estado con el valor obtenido
      };
  
      fetchDpi();
    }, []); // Se ejecuta solo una vez al montar el componente   

    useEffect(() => {
      // Simulación de llamada a una API para obtener la Fecha de Registro
      const fetchFechaRegistro = async () => {
        const fetchedFechaRegistro = "2023-05-07"; // Valor obtenido de la API
        setFechaRegistro(fetchedFechaRegistro); // Actualiza el estado con el valor obtenido
      };
    
      fetchFechaRegistro();
    }, []); // Se ejecuta solo una vez al montar el componente

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
    <main className="formulario-content3">
      <h1 className="titulos-pacientes3">Pacientes</h1>
      <div className="formulario-header3">
        <div className="circulo3-">
          <img src="/imagenes/iconoUsuario.png" alt="icono usuario" className="icono-usuario1" />
        </div>
        <h2>[nombre]</h2>
      </div>

      <nav className="tabs4">
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
        className="form-grid3"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}
      >
        <form onSubmit={handleSubmit}>
       <div className="doble3"> 
        <div className="campos3">
          <label>DPI Paciente:</label>
          <input
                type="text"
                value={dpiPaciente} // Muestra el valor dinámico
                readOnly // Hace que el campo sea de solo lectura
              />
        </div>
        <div className="campos3">
          <label>Fecha de Registro:</label>
          <input
                type="text"
                value={fecharegistro} // Muestra el valor dinámico
                readOnly // Hace que el campo sea de solo lectura
              />
        </div>
        </div>
        <h3 className="titulo-historials">Historia</h3>

    <div className="seccion-doble">   
      <div className="triple3">
        <div className="camposs2">
        <label>¿Padece alguna enfermedad?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs2">
          <label>¿Cuál?:</label>
          <input type="text" />
        </div>
        <div className="camposs2">
        <label>¿Usa medicamentos?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs2">
          <label>¿Cuál?:</label>
          <input type="text" />
        </div>
        <div className="camposs2">
        <label>¿Alergia a medicamentos? :</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs2">
          <label>¿Cuál?:</label>
          <input type="text" />
        </div>
        </div>

        <div className='cuatro3'>
        <div className="camposs2">
        <label>¿Ha sido hospitalizado en los ultimos 2 años?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs2">
            <label>¿Por qué?:</label>
            <input type="text" />
        </div>
        <div className="camposs2">
        <label>¿Está embarazada o cree estarlo?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs2">
            <label>¿Cuántos meses?:</label>
            <input type="text" />
        </div>
        <div className="camposs2">
            <label>¿Está dando de lactar?</label>
         <div>   
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs2">
            <label>¿Edad de desarrollo?:</label>
            <input type="text" />
        </div>
      </div>
    </div>

      <div className="acciones-formulario3">
          <button type="button" onClick={() => navigate('/historialodontologico')} className="btn-regresar">REGRESAR</button>
          <button type="button" className="btn-editar">EDITAR</button>
          <button type="submit" className="btn-guardar">GUARDAR</button>
      </div>

        </form>
      </motion.section>
    </main>
  );
}

export default Historialmedico;