import React, { useState, useEffect } from 'react'; 
import './habitos.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Habitos() {
    const navigate = useNavigate();
    const [id_paciente, setDpiPaciente] = useState("");
    const [fecha_registro, setFechaRegistro] = useState("");
    const [rechinar, setRechinar] = useState(false);
    const [chupar, setChupar] = useState(false);
    const [lengua, setLengua] = useState(false);
    const [unas, setUnas] = useState(false);
    const [morder, setMorder] = useState(false);
    const [respirar_boca, setRespirarBoca] = useState(false);


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
const handleSave = async (e) => {
  e.preventDefault();

  try {
    const res = await axios.post('http://localhost:4000/api/habitos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_paciente: id_paciente,
        fecha_registro: fecha_registro,
        rechinar,
        chupar,
        lengua,
        unas,
        morder,
        respirar_boca: respirar_boca
      })
    });

    const data = await res.json();
    if (res.ok) {
      showFlash('💾 Guardado correctamente');
    } else {
      showFlash('❌ Error: ' + data.error);
    }
  } catch (error) {
    console.error('Error al guardar:', error);
    showFlash('❌ Error en el servidor');
  }
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

        <form onSubmit={handleSave}>
       <div className="doble1"> 
        <div className="campos1">
          <label>DPI Paciente:</label>
        <input
            type="text"
            value={id_paciente}
            onChange={e => setDpiPaciente(e.target.value)}
          />
        </div>
        <div className="campos1">
          <label>Fecha de Registro:</label>
          <input
                type="date"
                value={fecha_registro} // Muestra el valor dinámico
                onChange={e => setFechaRegistro(e.target.value)}
              />
        </div>
        </div>

      <div className="cuatro1">
        <div className="camposs">
        <label>¿Rechinan los dientes?:</label>
        <div>
        <label>
          <input type="radio" name="rechinar" value="true" checked={rechinar === true} onChange={() => setRechinar(true)}
          /> Sí</label>
        <label>
          <input type="radio" name="rechinar" value="false" checked={rechinar === false} onChange={() => setRechinar(false)}
          /> No</label>
        </div>
        </div>
        <div className="camposs"> 
        <label>¿Se come las uñas?:</label>
        <div>
        <label>
          <input type="radio" name="unas" value="true" checked={unas === true} onChange={() => setUnas(true)}
          /> Sí</label>
        <label>
          <input type="radio" name="unas" value="false" checked={unas === false} onChange={() => setUnas(false)}
          /> No</label>
        </div>
        </div>
        <div className="camposs">
        <label>¿Respira por la boca?:</label>
        <div>
        <label>
          <input type="radio" name="respirar_boca" value="true" checked={respirar_boca === true} onChange={() => setRespirarBoca(true)}
          /> Sí</label>
        <label>
          <input type="radio" name="respirar_boca" value="false" checked={respirar_boca === false} onChange={() => setRespirarBoca(false)}
          /> No</label>
        </div>
        </div>
        <div className="camposs">
        <label>¿Se chupa o chupó el dedo gordo u otro dedo o el labio? :</label>
         <div> 
        <label>
          <input type="radio" name="chupar" value="true" checked={chupar === true} onChange={() => setChupar(true)}
          /> Sí</label>
        <label>
          <input type="radio" name="chupar" value="false" checked={chupar === false} onChange={() => setChupar(false)}
          /> No</label>
        </div>
        </div>
        <div className="camposs ">
        <label>¿Mantiene la lengua entre los dientes de enfrente? :</label>
        <div>
        <label>
          <input type="radio" name="lengua" value="true" checked={lengua === true} onChange={() => setLengua(true)}
          /> Sí</label>
        <label>
          <input type="radio" name="lengua" value="false" checked={lengua === false} onChange={() => setLengua(false)}
          /> No</label>
        </div>
        </div>
        <div className="camposs">
        <label>¿muerde objetos? :</label>
        <div>
         <label>
          <input type="radio" name="morder" value="true" checked={morder === true} onChange={() => setMorder(true)}
          /> Sí</label>
        <label>
          <input type="radio" name="morder" value="false" checked={morder === false} onChange={() => setMorder(false)}
          /> No</label>
        </div>
        </div>
      </div>

      <div className="HabitosPacientes-botones">

              {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}

          <button type="button" onClick={() => navigate('/agregarpaciente')} className="HabitosPacientes-btn-regresar">REGRESAR</button>
          <button type="button" className="HabitosPacientes-btn-editar" onClick={handleEdit}>EDITAR</button>
          <button type="button" className="HabitosPacientes-btn-guardar" onClick={handleDelete}>ELIMINAR</button>
          <button type="submit" className="HabitosPacientes-btn-guardar">GUARDAR</button>


      </div>

        </form>
      </motion.section>
    </main>
  );
}

export default Habitos;
