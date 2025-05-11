import React, { useState } from 'react';
import './Doctores.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabsDoctores = [
  { id: 'listdoctores', label: 'Listado de Doctores', path: '/listdoctores' },
  { id: 'registroDoctor', label: 'Información Doctor', path: '/doctores' },
];

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

const Doctores = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Para pestañas
  const [tabActiva, setTabActiva] = useState(() =>
    tabsDoctores.find(tab => tab.path === location.pathname)?.id || 'registroDoctor'
  );
  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  // Datos del doctor
  const [doctor, setDoctor] = useState({
    nombre: '',
    apellido: '',
    dpi: '',
    especialidad: '',
    honorarios: '',
    clinica: '',
    horaEntrada: '',
    horaSalida: '',
    telefono: '',
    movil: '',
    correoElectronico: ''
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor(prev => ({ ...prev, [name]: value }));
  };

  // Estado y función para el flash message
  const [message, setMessage] = useState('');
  const flashMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleSave = () => flashMessage('💾 Guardado correctamente');
  const handleEdit = () => flashMessage('🖋️ Editado correctamente');
  const handleDelete = () => flashMessage('🗑️ Eliminado correctamente');
  const handleBack = () => navigate('/contactos');

  return (
    <>
      <div className="doc-container">
        <h2 className="Listdoc-title">Contactos</h2>
        <hr />
        <nav className="doc-tabs" aria-label="Doctores">
          {tabsDoctores.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`doc-tab ${tabActiva === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Flash message */}
      {message && (
        <div className="flash-message">
          {message}
        </div>
      )}

      <motion.section
        className="doc-motion-section"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}  >
        <form className="doc-form">
          <div className="formulario-header">
            <div className="doc-circle">
              <img
                src="/imagenes/iconoUsuario.png"
                alt="icono usuario"
                className="doc-icon-img" />
            </div>
            <h2 className="doc-title">{doctor.nombre || 'Doctor'}</h2>
          </div>
          <hr className='hrdedoctor'/>

          <div className="doc-form-group">
            <div className="doc-field">
              <label htmlFor="nombre" className="doc-label">Nombre:</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                value={doctor.nombre}
                onChange={handleChange}
                className="input-doc" />
            </div>

            <div className="doc-field">
              <label htmlFor="apellido" className="doc-label">Apellido:</label>
              <input
                id="apellido"
                type="text"
                name="apellido"
                value={doctor.apellido}
                onChange={handleChange}
                className="input-doc" />
            </div>

            <div className="doc-field">
              <label htmlFor="dpi" className="doc-label">DPI:</label>
              <input
                id="dpi"
                type="text"
                name="dpi"
                value={doctor.dpi}
                onChange={handleChange}
                className="input-doc" />
            </div>

            <div className="doc-field">
              <label htmlFor="especialidad" className="doc-label">Especialidad:</label>
              <input
                id="especialidad"
                type="text"
                name="especialidad"
                value={doctor.especialidad}
                onChange={handleChange}
                className="input-doc" />
            </div>

            <div className="doc-field">
              <label htmlFor="honorarios" className="doc-label">Honorarios:</label>
              <input
                id="honorarios"
                type="number"
                name="honorarios"
                value={doctor.honorarios}
                onChange={handleChange}
                className="input-doc" />
            </div>

            <div className="doc-field">
              <label htmlFor="clinica" className="doc-label">Clínica:</label>
              <input
                id="clinica"
                type="text"
                name="clinica"
                value={doctor.clinica}
                onChange={handleChange}
                className="input-doc"/>
            </div>

            <div className="doc-field doc-time-wrapper">
              <label htmlFor="horaEntrada" className="doc-label">Hora Entrada:</label>
              <div className="wrapper-tiempo-doc">
                <input
                  id="horaEntrada"
                  type="time"
                  name="horaEntrada"
                  value={doctor.horaEntrada}
                  onChange={handleChange}
                  className="input-doc"/>
              </div>
            </div>

            <div className="doc-field doc-time-wrapper">
              <label htmlFor="horaSalida" className="doc-label">Hora Salida:</label>
              <div className="wrapper-tiempo-doc">
                <input
                  id="horaSalida"
                  type="time"
                  name="horaSalida"
                  value={doctor.horaSalida}
                  onChange={handleChange}
                  className="input-doc"/>
              </div>
            </div>

            <div className="doc-field">
              <label htmlFor="correoElectronico" className="doc-label">Correo:</label>
              <input
                id="correoElectronico"
                type="email"
                name="correoElectronico"
                value={doctor.correoElectronico}
                onChange={handleChange}
                className="input-doc"
              />
            </div>

            <div className="doc-field">
              <label htmlFor="telefono" className="doc-label">Teléfono:</label>
              <input
                id="telefono"
                type="tel"
                name="telefono"
                value={doctor.telefono}
                onChange={handleChange}
                className="input-doc"
              />
            </div>
          </div>

          <div className="doc-btn-actions">
            <button className="doc-btn" type="button" onClick={handleBack}>REGRESAR</button>
            <button className="doc-btn" type="button" onClick={handleSave}>GUARDAR</button>
            <button className="doc-btn" type="button" onClick={handleEdit}>EDITAR</button>
            <button className="doc-btn" type="button" onClick={handleDelete}>ELIMINAR</button>
          </div>
        </form>
      </motion.section>
    </>
  );
};

export default Doctores;
