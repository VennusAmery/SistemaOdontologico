// TratamientoPaciente.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './tratamiento.css';

export default function TratamientoPaciente() {
  const navigate = useNavigate();
  const location = useLocation();

  // — Datos generales del tratamiento —
  const [inicioTratamiento, setInicioTratamiento] = useState('');
  const [marcaTratamiento, setMarcaTratamiento] = useState('');
  const [marcaBanda, setMarcaBanda] = useState('');
  const [secuenciaArcos, setSecuenciaArcos] = useState('');
  const [aparatologia, setAparatologia] = useState('');
  const [recomendaciones, setRecomendaciones] = useState('');
  const [retencionMx, setRetencionMx] = useState('');
  const [retencionMd, setRetencionMd] = useState('');
  const [checkboxMarca, setCheckboxMarca] = useState({});
  const [checkboxAltura, setCheckboxAltura] = useState({});

  const toggleMarca = key =>
    setCheckboxMarca(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleAltura = key =>
    setCheckboxAltura(prev => ({ ...prev, [key]: !prev[key] }));

  useEffect(() => {
    // fetch paciente data...
  }, []);

  // — Odontograma interactivo —
  const [piezaInput, setPiezaInput] = useState('');
  const [piezasSeleccionadas, setPiezasSeleccionadas] = useState([]);
  const [odontogramaData, setOdontogramaData] = useState({});
  const [datosActivos, setDatosActivos] = useState({
    situacion: '',
    tratar: false,
    raiz: false,
    O: false,
    V: false,
    L: false,
    D: false,
    detalles: '',
    motivo: ''
  });
  const [piezaActiva, setPiezaActiva] = useState(null);
  const [flash, setFlash] = useState('');

  // Valida rango 18–48
  const valido = num => {
    const n = parseInt(num, 10);
    return !isNaN(n) && n >= 18 && n <= 48;
  };

  // Muestra flash 2s
  const mostrarFlash = msg => {
    setFlash(msg);
    setTimeout(() => setFlash(''), 2000);
  };

  const onGuardarPieza = () => {
    if (!valido(piezaInput)) {
      mostrarFlash('🦷 Pieza no existe (18–48)');
      return;
    }
    if (piezasSeleccionadas.includes(piezaInput)) {
      mostrarFlash('🦷 Pieza ya agregada');
      return;
    }
    setPiezasSeleccionadas(ps => [...ps, piezaInput]);
    setOdontogramaData(od => ({
      ...od,
      [piezaInput]: datosActivos
    }));
    setPiezaInput('');
    setDatosActivos({
      situacion: '',
      tratar: false,
      raiz: false,
      O: false,
      V: false,
      L: false,
      D: false,
      detalles: '',
      motivo: ''
    });
  };

  const handleKey = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onGuardarPieza();
    }
  };



const [modalPieza, setModalPieza] = useState(null);
// 2) Handlers para el modal
const handleDeletePieza = pieza => {
  setPiezasSeleccionadas(ps => ps.filter(p => p !== pieza));
  const od = { ...odontogramaData };
  delete od[pieza];
  setOdontogramaData(od);
  setModalPieza(null);
};

const handleSavePieza = pieza => {
  // aquí podrías enviar a backend o actualizar el state
  setModalPieza(null);
};

  const handleCambioDato = (campo, valor) => {
    setDatosActivos(d => ({ ...d, [campo]: valor }));
  };

  // — Tabs y navegación —
  const tabConfig = [
    { id: 'infoPaciente', label: 'Información de paciente', path: '/agregarpaciente' },
    { id: 'habitos', label: 'Hábitos', path: '/habitos' },
    { id: 'historialOdont', label: 'Historial Odontológico', path: '/historialodontologico' },
    { id: 'historialMed', label: 'Historial Médico', path: '/historialmedico' },
    { id: 'fotografias', label: 'Fotografías', path: '/fotografias' },
    { id: 'tratamiento', label: 'Tratamiento', path: '/tratamiento' }
  ];

  const tabVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 }
  };

  const handleSubmit = e => {
    e.preventDefault();
    // enviar todo a backend...
    navigate('/pacientes');
  };



/*FLASH DE LOS BOTONES DE ABAJO*/ 
const [flashMessage, setFlashMessage] = useState('');
const showFlash = (text) => {
  setFlashMessage(text);
  setTimeout(() => setFlashMessage(''), 3000);  // 3000 ms = 3 segundos
};

const handleDelete = (e) => {
  e.preventDefault();
  // aquí tu lógica de eliminar...
  showFlash('🗑️ Eliminado correctamente');
};

const handleEdit = (e) => {
  e.preventDefault();
  // aquí tu lógica de edición...
  showFlash('✏️ Editado correctamente');
};

const handleSave = (e) => {
  e.preventDefault();
  // aquí tu lógica de guardado...
  showFlash('💾 Guardado correctamente');
};


  return (
    <>
      {/* Mini-ventana flash */}
      {flash && <div className="flash-modal">{flash}</div>}

      {/*flash MESEGA PARA BOTONES DE ABAJOOO*/}
            {flashMessage && (
            <div className="flash-modal">
                {flashMessage}
            </div>
            )}

      {/* === Sección superior intacta === */}
      <div className="TratamientoPaciente-page">
      <h1 className="TratamientoPaciente-title">Pacientes</h1>
      <hr />
      <div className="TratamientoPaciente-header">
        <div className="TratamientoPaciente-avatar">
          <img src="/imagenes/iconoUsuario.png" alt="usuario" />
        </div>
        <h2>[Nombre Paciente]</h2>
      </div>
      <hr />

      <nav className="TratamientoPaciente-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            className={location.pathname === tab.path ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </nav>


      <motion.div
        className="TratamientoPaciente-container"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}
      >
        <form className="TratamientoPaciente-form" onSubmit={handleSubmit}>

          {/* Columna Izquierda: Datos generales */}
          <div>
            <div className="TratamientoPaciente-section">
              <label>Inicio de tratamiento:</label>
              <input
                type="date"
                value={inicioTratamiento}
                onChange={e => setInicioTratamiento(e.target.value)}
                className="TratamientoPaciente-input"
              />
            </div>
            <div className="TratamientoPaciente-section">
              <label>Marca y Número bandas:</label>
              <textarea
                value={marcaBanda}
                onChange={e => setMarcaBanda(e.target.value)}
                className="TratamientoPaciente-textarea"
              />
            </div>
            <div className="TratamientoPaciente-section">
              <label>Secuencia de Arcos:</label>
              <textarea
                value={secuenciaArcos}
                onChange={e => setSecuenciaArcos(e.target.value)}
                className="TratamientoPaciente-textarea"
              />
            </div>
            <div className="TratamientoPaciente-section">
              <label>Aparatología:</label>
              <textarea
                value={aparatologia}
                onChange={e => setAparatologia(e.target.value)}
                className="TratamientoPaciente-textarea"
              />
            </div>
            <div className="TratamientoPaciente-section">
              <label>Recomendaciones interdisciplinarias:</label>
              <textarea
                value={recomendaciones}
                onChange={e => setRecomendaciones(e.target.value)}
                className="TratamientoPaciente-textarea"
              />
            </div>
          </div>

          {/* Columna Derecha: Marca, altura y retención */}
          <div className="TratamientoPaciente-side">
            <div className="marca-container">
              <label>Marca:</label>
              <textarea
                value={marcaTratamiento}
                onChange={e => setMarcaTratamiento(e.target.value)}
                className="TratamientoPaciente-textarea marca"
              />
              <div className="checkbox-group marca">
                {['1.7','1.6','2.6','2.7','4.7','4.6','3.6','3.7'].map(key => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      checked={!!checkboxMarca[key]}
                      onChange={() => toggleMarca(key)}
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>
            <div className="altura-container">
              <label className="altura-label">Altura de Brackets:</label>
              <div className="checkbox-group altura">
                {[
                  '1.7','1.6','1.5','1.4','1.3','1.2','1.1',
                  '2.1','2.2','2.3','2.4','2.5','2.6','2.7',
                  '4.7','4.6','4.5','4.4','4.3','4.2','4.1',
                  '3.1','3.2','3.3','3.4','3.5','3.6','3.7'
                ].map(key => (
                  <label key={key}>
                    <input
                      type="checkbox"
                      checked={!!checkboxAltura[key]}
                      onChange={() => toggleAltura(key)}
                    />
                    {key}
                  </label>
                ))}
              </div>
            </div>
            <div className="TratamientoPaciente-section-inline retencion">
              <div>
                <label>Retención Mx:</label>
                <textarea
                  value={retencionMx}
                  onChange={e => setRetencionMx(e.target.value)}
                  className="TratamientoPaciente-textarea"
                />
              </div>
              <div>
                <label>Retención Md:</label>
                <textarea
                  value={retencionMd}
                  onChange={e => setRetencionMd(e.target.value)}
                  className="TratamientoPaciente-textarea"
                />
              </div>
            </div>
          </div>

          {/* Odontograma: tres columnas */}
          <div className="odontograma-layout">
            {/* 1) Formulario Pieza */}
            <div className="odontograma-form">
              <h3>Agregar Pieza</h3>
              <input
                type="text"
                placeholder="Número de pieza (18 – 48)"
                value={piezaInput}
                onChange={e => setPiezaInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <div className="odontograma-campos">
                <label>Situación:</label>
                <select
                  value={datosActivos.situacion}
                  onChange={e => handleCambioDato('situacion', e.target.value)}
                >
                  <option value="">Seleccione</option>
                  <option>Fractura</option>
                  <option>Caries</option>
                  <option>Ausente</option>
                  <option>Obturación</option>
                </select>

<div className="checkbox-row">
  <label>
    <input
      type="checkbox"
      checked={datosActivos.tratar}
      onChange={e => handleCambioDato('tratar', e.target.checked)}
    /> Tratar
  </label>

            <div className="checbokfomrpac">
                <input
                type="checkbox"
                id="raiz"   /* Asegúrate de que el ID y el htmlFor coincidan */
                checked={datosActivos.raiz}
                onChange={e => handleCambioDato('raiz', e.target.checked)}
                /> 
                <label htmlFor="raiz">Raíz</label>
            </div>

            {['O', 'V', 'L', 'D'].map(c => (
                <div className="checkbox-item" key={c}>
                <input
                    type="checkbox"
                    id={c}  /* Agregar id único para cada uno */
                    checked={datosActivos[c]}
                    onChange={e => handleCambioDato(c, e.target.checked)}
                />
                <label htmlFor={c}>{c}</label>
                </div>
            ))}
                </div>
                <label>Detalles:</label>
                <textarea
                  value={datosActivos.detalles}
                  onChange={e => handleCambioDato('detalles', e.target.value)}
                />
                <label>Motivo:</label>
                <textarea
                  value={datosActivos.motivo}
                  onChange={e => handleCambioDato('motivo', e.target.value)}
                />
                <button type="button" className="btn-guardar-pieza" onClick={onGuardarPieza}>
                  GUARDAR 
                </button>
              </div>
            </div>

                            {/* 2) Mini-listado y detalle */}
                <div className="odontograma-lista">
                <h3>Piezas Guardadas</h3>
                <ul>
                    {piezasSeleccionadas.map(p => (
                    <li key={p} onClick={() => setModalPieza(p)}>
                        Pieza {p}
                    </li>
                    ))}
                </ul>

                {modalPieza && (
                    <div className="modal-overlay">
                    <div className="modal-content">
                        <h4>Detalle Pieza {modalPieza}</h4>
                        <p><strong>Situación:</strong> {odontogramaData[modalPieza].situacion}</p>
                        <p>
                        <strong>Opciones:</strong>{' '}
                        {odontogramaData[modalPieza].tratar && 'Tratar '}
                        {odontogramaData[modalPieza].raiz && 'Raíz '}
                        {['O','V','L','D']
                            .filter(c => odontogramaData[modalPieza][c])
                            .join(' ')}
                        </p>
                        <p><strong>Detalles:</strong> {odontogramaData[modalPieza].detalles}</p>
                        <p><strong>Motivo:</strong> {odontogramaData[modalPieza].motivo}</p>

                        <div className="modal-buttons">
                        <button onClick={() => handleSavePieza(modalPieza)}>Modificar</button>
                        <button onClick={() => handleDeletePieza(modalPieza)}>Eliminar</button>
                        <button onClick={() => setModalPieza(null)}>Cerrar</button>
                        </div>
                    </div>
                    </div>
                )}
                </div>

            {/* 3) Imagen */}
            <div className="odontograma-imagen">
              <h3 className='h3Odontograma'>Odontograma Visual</h3>
              <img src="/imagenes/dientes.png" alt="Odontograma" />
            </div>
          </div>

          {/* Botones finales */}
          
<div className="TratamientoPaciente-buttons">
  <button type="button" onClick={() => navigate(-1)}>REGRESAR</button>
  <button type="button" onClick={handleDelete}>ELIMINAR</button>
  <button type="button" onClick={handleEdit}>EDITAR</button>
  <button type="button" onClick={handleSave}>GUARDAR</button>
</div>

        </form>
      </motion.div>
      </div>
    </>
  );
}
