import React, { useState, useEffect } from 'react'; 
import './habitos.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Habitos() {
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

  const [activeEncabezado, setActiveEncabezado] = useState('habitos');

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
    <main className="formulario-content1">

      <h2 className="HabitosPacientes-title">Pacientes</h2>
      <hr className="HabitosPacientes-hr" />

      <nav className="HabitosPacientes-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`HabitosPacientes-tab ${activeEncabezado === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveEncabezado(tab.id);
              navigate(tab.path);
            }}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section  
        className="form-grid1"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}>

        <div className="HabitosPacientes-container2">
          <div className="HabitosPacientes-circle">
            <img src="/imagenes/paciente.png" alt="Proveedor" className="HabitosPacientes-image" />
          </div>
          <div className="HabitosPacientes-text">
            <h2 className="HabitosPacientes-header-title">Habitos Pacientes</h2>
          </div>
        </div>
        <hr className="HabitosPacientes-separator" />

        <form onSubmit={handleSubmit}>
       <div className="doble1"> 
        <div className="campos1">
          <label>DPI Paciente:</label>
          <input
                type="text"
                value={dpiPaciente} // Muestra el valor dinámico
                readOnly // Hace que el campo sea de solo lectura
              />
        </div>
        <div className="campos1">
          <label>Fecha de Registro:</label>
          <input
                type="text"
                value={fecharegistro} // Muestra el valor dinámico
                readOnly // Hace que el campo sea de solo lectura
              />
        </div>
        </div>

      <div className="cuatro1">
        <div className="camposs">
        <label>¿Rechinan los dientes?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs"> 
        <label>¿Se come las uñas?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs">
        <label>¿Respira por la boca?:</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs">
        <label>¿Se chupa o chupó el dedo gordo u otro dedo o el labio? :</label>
         <div> 
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs ">
        <label>¿Mantiene la lengua entre los dientes de enfrente? :</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
        <div className="camposs">
        <label>¿muerde objetos? :</label>
        <div>
          <label><input type="radio" name="mayoria" value="si" /> Sí</label>
          <label><input type="radio" name="mayoria" value="no" /> No</label>
        </div>
        </div>
      </div>

      <div className="HabitosPacientes-botones">

              {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}

          <button type="button" onClick={() => navigate('/agregarpaciente')} className="HabitosPacientes-btn-regresar">REGRESAR</button>
          <button type="button" className="HabitosPacientes-btn-editar" onClick={handleEdit}>EDITAR</button>
          <button type="button" className="HabitosPacientes-btn-guardar" onClick={handleEdit}>ELIMINAR</button>
          <button type="button" className="HabitosPacientes-btn-guardar" onClick={handleSave}>GUARDAR</button>

      </div>

        </form>
      </motion.section>
    </main>
  );
}

export default Habitos;
