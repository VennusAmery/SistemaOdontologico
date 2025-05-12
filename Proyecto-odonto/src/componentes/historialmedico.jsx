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
    exit:    { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 }
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
    <main className="formulario-content3">

      <h2 className="HistorialMedico-title">Pacientes</h2>
      <hr className="HistorialMedico-hr" />
      <nav className="HistorialMedico-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`HistorialMedico-tab ${activeEncabezado === tab.path ? 'active' : ''}`}
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
        className="form-grid3"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}>


        <div className="HistorialMedico-container2">
          <div className="HistorialMedico-circle">
            <img src="/imagenes/paciente.png" alt="Proveedor" className="HistorialMedico-image" />
          </div>
          <div className="HistorialMedico-text">
            <h2 className="HistorialMedico-header-title">Historial Medico</h2>
          </div>
        </div>
        <hr className="HistorialMedico-separator" />


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


      <div className="HistorialMedico-botones">

              {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}

          <button type="button" onClick={() => navigate('/agregarpaciente')} className="HistorialMedico-btn-regresar">REGRESAR</button>
          <button type="button" className="HistorialMedico-btn-editar" onClick={handleEdit}>EDITAR</button>
          <button type="button" className="HistorialMedico-btn-guardar" onClick={handleEdit}>ELIMINAR</button>
          <button type="button" className="HistorialMedico-btn-guardar" onClick={handleSave}>GUARDAR</button>

      </div>

        </form>
      </motion.section>
    </main>
  );
}

export default Historialmedico;