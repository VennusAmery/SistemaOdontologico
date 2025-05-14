import React, { useState, useEffect } from 'react';
import './historialodontologico.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Historialodontologico() {
  const navigate = useNavigate();
  const location = useLocation();

  const [id_paciente, setDpiPaciente] = useState('');
  const [fecha_registro, setFechaRegistro] = useState('');
  const [fecha_ultima_consulta, setFechaUltimaConsulta] = useState('');
  const [motivo_consulta, setMotivoConsulta] = useState('');
  const [dolor, setTieneDolor] = useState('');
  const [dientes_dolor, setDientesDolor] = useState('');
  const [sangrado, setSangrado] = useState('');
  const [antecedentes_familiares, setAntecedentesFamiliares] = useState('');

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

  const [activeEncabezado, setActiveEncabezado] = useState(location.pathname);

  useEffect(() => {
    setActiveEncabezado(location.pathname);
  }, [location]);

  const [flashMessage, setFlashMessage] = useState('');
  const showFlash = text => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 3000);
  };

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/api/historialodonto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id_paciente,
        fecha_registro,
        motivo_consulta,
        fecha_ultima_consulta,
        dolor,
        dientes_dolor,
        sangrado,
        antecedentes_familiares,
      }),
      });

      if (response.ok) {
        showFlash('💾 Guardado correctamente');
      } else {
        showFlash('❌ Error al guardar');
      }
    } catch (error) {
      console.error(error);
      showFlash('❌ Error de conexión con el servidor');
    }
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
              setActiveEncabezado(tab.path);
              navigate(tab.path);
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
        transition={tabVariants.transition}
      >
        <div className="HistorialOdonto-container2">
          <div className="HistorialOdonto-circle">
            <img src="/imagenes/paciente.png" alt="Paciente" className="HistorialOdonto-image" />
          </div>
          <div className="HistorialOdonto-text">
            <h2 className="HistorialOdonto-header-title">Historial Odontológico</h2>
          </div>
        </div>

        <hr className="HistorialOdonto-separator" />

        <form onSubmit={handleSubmit}>
          <div className="doble2">
            <div className="campos2">
              <label>DPI Paciente:</label>
              <input
                type="text"
                value={id_paciente}
                onChange={e => setDpiPaciente(e.target.value)}
              />
            </div>

            <div className="campos2">
              <label>Fecha de Registro:</label>
              <input
                type="date"
                value={fecha_registro}
                onChange={e => setFechaRegistro(e.target.value)}
              />
            </div>
          </div>

          <div className="triple1">
            <div className="camposs1">
              <label>¿Cuándo fue su última visita al odontólogo?</label>
              <input
                type="date"
                value={fecha_ultima_consulta}
                onChange={e => setFechaUltimaConsulta(e.target.value)}
              />
            </div>

            <div className="camposs1">
              <label>¿Cuál fue el motivo?</label>
              <input
                type="text"
                value={motivo_consulta}
                onChange={e => setMotivoConsulta(e.target.value)}
              />
            </div>
          </div>

          <div className="cuatro2">
            <div className="camposs1">
              <label>¿Tiene dolor en algún diente o muela?</label>
              <div>
              <label>
                <input type="radio" name="dolor" value="true" checked={dolor === true} onChange={() => setTieneDolor(true)}
                />Sí</label>
                <label>
                <input type="radio" name="dolor" value="false" checked={dolor === false} onChange={() => setTieneDolor(false)}
                />No</label>
              </div>
            </div>

            <div className="camposs1">
              <label>¿Cuál es?</label>
              <input
                type="text"
                value={dientes_dolor}
                onChange={e => setDientesDolor(e.target.value)}
              />
            </div>

            <div className="camposs1">
              <label>¿Sangran las encías al cepillado?</label>
              <div>
            <label>
                <input type="radio" name="sangrado" value="true" checked={sangrado === true} onChange={() => setSangrado(true)}
                />Sí</label>
                <label>
                <input type="radio" name="sangrado" value="false" checked={sangrado === false} onChange={() => setSangrado(false)}
                />No</label>
              </div>
            </div>

            <div className="camposs1">
                <label>¿Algún miembro de su familia tiene el mismo problema de</label>
             <label>malposición de los dientes y forma que encaja la mordida?</label>
              <input
                type="text"
                value={antecedentes_familiares}
                onChange={e => setAntecedentesFamiliares(e.target.value)}
              />
            </div>
          </div>

          <div className="HistorialOdontologico-botones">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}

            <button type="button" onClick={() => navigate('/agregarpaciente')} className="HistorialOdontologico-btn-regresar">REGRESAR</button>
            <button type="submit" className="HistorialOdontologico-btn-guardar">GUARDAR</button>
          </div>
        </form>
      </motion.section>
    </main>
  );
}

export default Historialodontologico;

