// TratamientoPaciente.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import './tratamiento.css';

export default function TratamientoPaciente() {
  const navigate = useNavigate();
  const location = useLocation();
  const [strippingForm, setStrippingForm] = useState({ pieza: '', fecha: '' });


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

  // — Odontograma —
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

  //flashmesage de las piezas que se guardan
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
    transition: { duration: 0.4 }
  };

  // Usa la ruta actual para establecer el tab activo
  const [activeEncabezado, setActiveEncabezado] = useState(location.pathname);

  // Actualiza el estado del tab activo cuando la ruta cambia
  useEffect(() => {
    setActiveEncabezado(location.pathname);
  }, [location]);

const [flashMessage, setFlashMessage] = useState('');
const showFlash = (msg) => {
  if (!flashMessage) { // Solo muestra si no hay mensaje activo
    setFlashMessage(msg); // Muestra el nuevo mensaje
    setTimeout(() => setFlashMessage(''), 3000); // Borra el mensaje después de 3 segundos
  }
};

useEffect(() => {
  if (flashMessage) {
    const timer = setTimeout(() => setFlashMessage(''), 3000); // Oculta tras 3 segundos
    return () => clearTimeout(timer);
  }
}, [flashMessage]);

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
    showFlash('');
  };

{/*REGSTROS*/}
  // — Registros dinámicos —
const [arsPieces, setArsPieces] = useState([{ pieza: '', fecha: '' }]);
const [strippingPieces, setStrippingPieces] = useState([{ pieza: '', fecha: '' }]);
const [readhesionPieces, setReadhesionPieces] = useState([]);
const [newReadhesion, setNewReadhesion] = useState({ pieza: '', fecha: '' });

const handleDeleteRead = (index) => {
  const updated = readhesionPieces.filter((_, i) => i !== index);
  setReadhesionPieces(updated);
  setModalRead(null);
};

   // Modal índices




const [modalArs, setModalArs] = useState(null);
const [modalStrip, setModalStrip] = useState(null);
const [modalRead, setModalRead] = useState(null);
const [arsForm, setArsForm] = useState({ fecha: '', pieza: '' });

  const [arsList, setArsList] = useState([]);
  const [newArs, setNewArs] = useState('');
  const [strings, setStrings] = useState([]);
  const [newString, setNewString] = useState('');
  
const handleAgregarReadhesion = (e) => {
  e.preventDefault();
  const pieza = newReadhesion.pieza.trim();
  const fecha = newReadhesion.fecha;
  if (!pieza || !fecha) {
    showFlash('⚠️ Debes ingresar una pieza y una fecha');
    return;
  }
  const yaExiste = readhesionPieces.some(
    entrada => entrada.pieza === pieza && entrada.fecha === fecha
  );
  if (yaExiste) {
    showFlash('⚠️ Esta pieza con esa fecha ya fue registrada');
    return;
  }
  const nuevaEntrada = { pieza, fecha };
  setReadhesionPieces(prev => [...prev, nuevaEntrada]);
  setNewReadhesion({ pieza: '', fecha: '' });
  showFlash('✅ Re-adhesión agregada correctamente');
};

const handleAgregarARS = () => {
  const { fecha, pieza } = arsForm;
  
  // Verifica si ambos campos tienen valor
  if (fecha && pieza) {
    setArsPieces(prev => [...prev, { fecha, pieza }]);
    setArsForm({ fecha: '', pieza: '' }); // Limpiar formulario después de agregar
  } else {
    showFlash('⚠️ Debes ingresar una fecha y una pieza');
  }
};



const handleAgregarString = () => {
  if (strippingForm.pieza.trim() && strippingForm.fecha) {
    // Lógica para agregar Stripping
    setStrippingPieces(prev => [...prev, strippingForm]);
    setStrippingForm({ pieza: '', fecha: '' }); // Limpiar formulario
  } else {
    showFlash('⚠️ Debes ingresar una pieza y una fecha'); // Mostrar mensaje de advertencia si faltan datos
  }
};



const handleVerArs = (i) => {
  setModalArs(i);  // Solo abre el modal, no muestra el mensaje de guardado.
  setFlashMessage('');  // Borra cualquier mensaje previo
};


// Función para eliminar un ARS
const handleDeleteArs = (index) => {
  const newArsPieces = arsPieces.filter((_, i) => i !== index);
  setArsPieces(newArsPieces);
  setModalArs(null); // Cierra el modal después de eliminar
};


const handleDeleteStrip = (index) => {
  const newList = [...strippingPieces];  // Crear una copia de la lista
  newList.splice(index, 1);  // Eliminar el elemento en el índice
  setStrippingPieces(newList);  // Actualizar el estado con la nueva lista
  setModalStrip(null);  // Cerrar el modal después de eliminar
};


  return (
    <>
      {/* Mini-ventana flash */}
      {flash && <div className="flash-modal">{flash}</div>}

      {/* === Sección superior intacta === */}
      <div className="TratamientoPaciente-page">

      <h2 className="TratamientoPaciente-title">Pacientes</h2>
      <hr className="TratamientoPaciente-hr" />
      <nav className="TratamientoPaciente-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`TratamientoPaciente-tab ${activeEncabezado === tab.path ? 'active' : ''}`}
            onClick={() => {
              setActiveEncabezado(tab.path); // Establecer la ruta activa
              navigate(tab.path); // Navegar a la ruta
            }}
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



        <div className="TratamientoPaciente-container2">
          <div className="TratamientoPaciente-circle">
            <img src="/imagenes/paciente.png" alt="Proveedor" className="TratamientoPaciente-image" />
          </div>
          <div className="TratamientoPaciente-text">
            <h2 className="TratamientoPaciente-header-title">Tratamiento</h2>
          </div>
        </div>
        <hr className="TratamientoPaciente-separator" />




        <form className="TratamientoPaciente-form" onSubmit={handleSubmit}>
  <div className="form-inner">


                  {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}

          {/* Columna Izquierda: Datos generales */}
          <div className="TratamientoPaciente-dos-columnas">
              <div className="columna">

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
            <div className='columna'>
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
          </div>
          </div>

          {/* Odontograma: tres columnas */}
<div className="flex flex-col gap-2">

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
                        <button onClick={() => handleDeleteRead(modalPieza)}>Eliminar</button>
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

        {/* Registros */}
        <div className="seccion-doble4 flex gap-6 mt-8">

            <div className="registro-columna flex-1 bg-white p-4 rounded-xl shadow-md flex gap-4">
              {/* Formulario ARS estático */}
              <div className="flex-1">
                <h3>ARS</h3>
                <div className="camposs4 flex flex-col gap-2 mb-2">
                  <label>Fecha:</label>
                  <input
                    type="time"
                    value={arsForm.fecha}
                    onChange={e => setArsForm(f => ({ ...f, fecha: e.target.value }))}
                  />
                  <label>Pieza:</label>
                  <input
                    type="text"
                    value={arsForm.pieza}
                    onChange={e => setArsForm(f => ({ ...f, pieza: e.target.value }))}
                  />
                </div>
                <button className='butonred'onClick={handleAgregarARS}>AGREGAR</button>

              </div>

              {/* Listado ARS con scroll */}
              <div className="flex-1">
                <h4>Listado ARS</h4>
                <ul className="mini-listado">
                  {arsPieces.map((p, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{p.pieza || '–'}</span>
                      <button  className="butonverred" onClick={(handleVerArs) => setModalArs(i)}>Ver</button>
                    </li>
                  ))}
                </ul>
              </div>

{modalArs !== null && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Detalle ARS #{modalArs + 1}</h4>
      <p><strong>Pieza:</strong> {arsPieces[modalArs].pieza}</p>
      <p><strong>Fecha:</strong> {arsPieces[modalArs].fecha}</p>
      <div className="modal-buttons flex gap-2">
        <button onClick={() => handleSaveArs(modalArs)}>Guardar</button>
        <button onClick={() => handleDeleteArs(modalArs)}>Eliminar</button>
        <button onClick={() => setModalArs(null)}>Cerrar</button>
      </div>
    </div>
  </div>
)}

{modalStrip !== null && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Detalle Stripping #{modalStrip + 1}</h4>
      <p><strong>Pieza:</strong> {strippingPieces[modalStrip].pieza}</p>
      <p><strong>Fecha:</strong> {strippingPieces[modalStrip].fecha}</p>
      <div className="modal-buttons flex gap-2">
        <button onClick={() => handleSaveStrip(modalStrip)}>Guardar</button>
        <button onClick={() => handleDeleteRead(modalRead)}>Eliminar</button>
        <button onClick={() => setModalStrip(null)}>Cerrar</button>
      </div>
    </div>
  </div>
)}

          </div>

                {/* Stripping */}
                <div className="registro-columna flex-1 bg-white p-4 rounded-xl shadow-md flex gap-4">
                  {/* Formulario para agregar piezas de Stripping */}
{/* Formulario para agregar piezas de Stripping */}
<div className="flex-1">
  <h3>Stripping</h3>
  <div className="camposs4 flex flex-col gap-2 mb-2">
    <label>Fecha:</label>
    <input
      type="time"
      value={strippingForm.fecha}
      onChange={e => setStrippingForm(f => ({ ...f, fecha: e.target.value }))}
    />
    <label>Pieza:</label>
    <input
      type="text"
      value={strippingForm.pieza}
      onChange={e => setStrippingForm(f => ({ ...f, pieza: e.target.value }))}
    />
  </div>
  <button className='butonred' onClick={handleAgregarString}>AGREGAR</button>
</div>


                  {/* Listado de Stripping */}
                  <div className="flex-1">
                    <h4>Listado Stripping</h4>
                    <ul className="mini-listado">
                      {strippingPieces.map((p, i) => (
                        <li key={i} className="flex justify-between">
                          <span>{p.pieza || '–'}</span>
                          <button className="butonverred" onClick={() => setModalStrip(i)}>Ver</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

              {modalStrip !== null && (
                <div className="modal-overlay">
                  <div className="modal-content">
                    <h4>Detalle Stripping #{modalStrip + 1}</h4>
                    <p><strong>Pieza:</strong> {strippingPieces[modalStrip].pieza}</p>
                    <p><strong>Fecha:</strong> {strippingPieces[modalStrip].fecha}</p>
                    <div className="modal-buttons flex gap-2">
                      <button onClick={() => handleSaveStrip(modalStrip)}>Guardar</button>
                      <button onClick={() => handleDeleteStrip(modalStrip)}>Eliminar</button>
                      <button onClick={() => setModalStrip(null)}>Cerrar</button>
                    </div>
                  </div>
                </div>
              )}
          </div>

            {/* Readhesiones */}
            <div className="registro-columna-read">
              {/* Formulario para agregar Readhesiones */}
              <div className="flex-1">
                <h3>Readhesiones</h3>
                <div className="camposs4 flex flex-col gap-2 mb-2">
                  <label>Fecha:</label>
                  <input
                    type="time"
                    value={newReadhesion.fecha}
                    onChange={e => setNewReadhesion({ ...newReadhesion, fecha: e.target.value })}
                  />
                  <label>Pieza:</label>
                  <input
                    type="text"
                    value={newReadhesion.pieza}
                    onChange={e => setNewReadhesion(prev => ({ ...prev, pieza: e.target.value }))}/>
                </div>

                <button className='butonred' onClick={handleAgregarReadhesion}>AGREGAR</button>
                  </div>

  {/* Listado de Readhesiones */}
  <div className="flex-1">
    <h4>Listado Readhesiones</h4>
    <ul className="mini-listado">
      {readhesionPieces.map((p, i) => (
        <li key={i} className="flex justify-between">
          <span>{p.pieza || '–'}</span>
<button className="butonverred" onClick={() => setModalRead(i)}>
  Ver
</button>
        </li>
      ))}
    </ul>
  </div>

  {/* Modal para detalle de Readhesión */}
{modalRead !== null && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h4>Detalle Readhesión #{modalRead + 1}</h4>
      <p><strong>Pieza:</strong> {readhesionPieces[modalRead].pieza}</p>
      <p><strong>Fecha:</strong> {readhesionPieces[modalRead].fecha}</p>
      <div className="modal-buttons flex gap-2">
        <button
          onClick={() => {
            const newList = [...readhesionPieces];
            newList.splice(modalRead, 1);
            setReadhesionPieces(newList);
            setModalRead(null);
          }}
        >
          Eliminar
        </button>
        <button onClick={() => setModalRead(null)}>Cerrar</button>
      </div>
    </div>
  </div>
)}

</div>




        </div>
          </div>

          {/* Botones finales */}          
  <div className="TrataPac-botones">
          <button type="button" onClick={() => navigate('/agregarpaciente')} className="TrataPac-btn-regresar">REGRESAR</button>
          <button type="button" className="TrataPac-btn-editar" onClick={handleEdit}>EDITAR</button>
          <button type="button" className="TrataPac-btn-guardar" onClick={handleDelete}>ELIMINAR</button>
          <button type="button" className="TrataPac-btn-guardar" onClick={handleSave}>GUARDAR</button>
  </div>


    </form>
  </motion.div>
</div>
</>
);
}
