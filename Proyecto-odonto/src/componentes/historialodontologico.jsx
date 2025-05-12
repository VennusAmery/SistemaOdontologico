import React, { useState, useEffect } from 'react';
import './historialodontologico.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function Historialodontologico() {
  const navigate = useNavigate();
  const location = useLocation(); // Para obtener la ruta actual
  const [dpiPaciente, setDpiPaciente] = useState("");
  const [fecharegistro, setFechaRegistro] = useState("");

  useEffect(() => {
    const fetchDpi = async () => {
      const fetchedDpi = "1234567890101"; // Valor obtenido de la API
      setDpiPaciente(fetchedDpi); // Actualiza el estado con el valor obtenido
    };
    fetchDpi();
  }, []);

  useEffect(() => {
    const fetchFechaRegistro = async () => {
      const fetchedFechaRegistro = "2023-05-07"; // Valor obtenido de la API
      setFechaRegistro(fetchedFechaRegistro); // Actualiza el estado con el valor obtenido
    };
    fetchFechaRegistro();
  }, []);

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
    transition: { duration: 0.4 },
  };

  // Usa la ruta actual para establecer el tab activo
  const [activeEncabezado, setActiveEncabezado] = useState(location.pathname);

  // Actualiza el estado del tab activo cuando la ruta cambia
  useEffect(() => {
    setActiveEncabezado(location.pathname);
  }, [location]);

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
    <main className="formulario-content2">

      <h2 className="HistorialOdonto-title">Pacientes</h2>
      <hr className="HistorialOdonto-hr" />
      <nav className="HistorialOdonto-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`HistorialOdonto-tab ${activeEncabezado === tab.path ? 'active' : ''}`}
            onClick={() => {
              setActiveEncabezado(tab.path); // Establecer la ruta activa
              navigate(tab.path); // Navegar a la ruta
            }}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section  
        className="form-grid2"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}>

        <div className="HistorialOdonto-container2">
          <div className="HistorialOdonto-circle">
            <img src="/imagenes/paciente.png" alt="Proveedor" className="HistorialOdonto-image" />
          </div>
          <div className="HistorialOdonto-text">
            <h2 className="HistorialOdonto-header-title">Historial Odontologico</h2>
          </div>
        </div>
        <hr className="HistorialOdonto-separator" />

        <form onSubmit={handleSubmit}>
       <div className="doble2"> 
        <div className="campos2">
          <label>DPI Paciente:</label>
          <input
                type="text"
                value={dpiPaciente} // Muestra el valor dinámico
                readOnly // Hace que el campo sea de solo lectura
              />
        </div>
        <div className="campos2">
          <label>Fecha de Registro:</label>
          <input
                type="text"
                value={fecharegistro} // Muestra el valor dinámico
                readOnly // Hace que el campo sea de solo lectura
              />
        </div>
        </div>

      <div className="triple1">
        <div className="camposs1">
            <label>¿Cuando fue su ultima visita al odontologo?:</label>
            <input type="text" />
        </div>
        <div className="camposs1"> 
        <label>¿Cual fue el motivo?:</label>
            <input type="text" />
        </div>
        </div>
       <div className='cuatro2'>
        <div className="camposs1">
        <label>¿Tiene dolor en algun diente o muela?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs1">
        <label>¿Cual es?:</label>
        <input type="text" />
        </div>
        <div className="camposs1">
        <label>¿Sangran las encillas al cepillado? :</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs1">
        <label>¿Algún miembro de su familia tiene el mismo problema de</label>
             <label>malposición de los dientes y forma que encaja la mordida? :</label>
        <div>     
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
      </div>


      <div className="HistorialOdontologico-botones">

              {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}

          <button type="button" onClick={() => navigate('/agregarpaciente')} className="HistorialOdontologico-btn-regresar">REGRESAR</button>
          <button type="button" className="HistorialOdontologico-btn-editar" onClick={handleEdit}>EDITAR</button>
          <button type="button" className="HistorialOdontologico-btn-guardar" onClick={handleEdit}>ELIMINAR</button>
          <button type="button" className="HistorialOdontologico-btn-guardar" onClick={handleSave}>GUARDAR</button>

      </div>

        </form>
      </motion.section>
    </main>
  );
}

export default Historialodontologico;
