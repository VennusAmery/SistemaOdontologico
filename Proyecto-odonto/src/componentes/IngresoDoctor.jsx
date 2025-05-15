import React, { useState, useEffect } from 'react';
import './Doctores.css';
import axios from 'axios';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabsDoctores = [
  { id: 'listdoctores', label: 'Listado de Doctores', path: '/listdoctores' },
  { id: 'registroDoctor', label: 'Información Doctor', path: '/doctores' },
];

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit:    { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

export default function IngresoDoctor() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();    // <-- obtienes el ID

  const [tabActiva, setTabActiva] = useState(
    () => tabsDoctores.find(t => location.pathname.startsWith(t.path))?.id
       || 'registroDoctor'
  );
  const handleTabClick = tab => {
    setTabActiva(tab.id);
    // si hay id, mantenlo para edición
    navigate(tab.path + (id ? `/${id}` : ''));
  };

  const [doctor, setDoctor] = useState({
    nombre: '', apellido: '', dpi: '',
    especialidad: '', honorarios: '',
    clinica: '', horaEntrada: '',
    horaSalida: '', telefono: '',
    correoElectronico: ''
  });
  const [message, setMessage] = useState('');

  // Carga datos al montar si hay ID
  useEffect(() => {
    if (!id) return;
  axios.get(`http://localhost:4000/api/ingresodoctor/${id}`)
    .then(({ data }) => {
      setDoctor({
        nombre:            data.nombre,
        apellido:          data.apellido,
        dpi:               data.dpi,
        especialidad:      data.especialidad,
        honorarios:        data.honorarios,
        clinica:           data.clinica,
        horaEntrada:       data.horaEntrada,
        horaSalida:        data.horaSalida,
        telefono:          data.telefono,
        correoElectronico: data.correoElectronico,
      });
    })
    .catch(err => console.error('Error al cargar datos del doctor:', err));
}, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setDoctor(d => ({ ...d, [name]: value }));
  };
  const flash = txt => {
    setMessage(txt);
    setTimeout(() => setMessage(''), 2000);
  };

  // Guardar (editar si hay ID, crear si no)
  const handleSave = () => {
const payload = {
  nombre: doctor.nombre,
  apellido: doctor.apellido,
  dpi: doctor.dpi,
  especialidad: doctor.especialidad,
  honorarios: doctor.honorarios,
  clinica: doctor.clinica,
  horaEntrada: doctor.horaEntrada,
  horaSalida: doctor.horaSalida,
  telefono: doctor.telefono,
  correoElectronico: doctor.correoElectronico,
  movil: doctor.movil
};

    const fn = id
      ? axios.put(`http://localhost:4000/api/ingresodoctor/${id}`, doctor)
      : axios.post(`http://localhost:4000/api/ingresodoctor`, doctor);

    fn.then(() => flash(id ? '🖋️ Editado correctamente' : '💾 Guardado correctamente'))
      .catch(err => console.error('Error al guardar doctor:', err));
  };

  // Eliminar
  const handleDelete = () => {
    if (!id || !window.confirm('¿Eliminar este doctor?')) return;
    axios.delete(`http://localhost:4000/api/ingresodoctor/${id}`)
      .then(() => {
        flash('🗑️ Eliminado correctamente');
        navigate('/listdoctores');
      })
      .catch(err => console.error('Error al eliminar doctor:', err));
  };

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
               onClick={()=>handleTabClick(tab)}>
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

                {/* Campos */}
          <div className="doc-form-group">
            {[
              ['nombre','Nombre'],['apellido','Apellido'],
              ['dpi','DPI'],['especialidad','Especialidad'],
              ['honorarios','Honorarios'],['clinica','Clínica'],
              ['horaEntrada','Hora Entrada'],['horaSalida','Hora Salida'],
              ['correoElectronico','Correo'],['telefono','Teléfono']
            ].map(([field,label])=>(
              <div key={field} className={`doc-field${field.includes('hora')?' doc-time-wrapper':''}`}>
                <label htmlFor={field} className="doc-label">{label}:</label>
                <div className={field.includes('hora')?'wrapper-tiempo-doc':''}>
                  <input
                    id={field}
                    name={field}
                    type={field.includes('hora')?'time': field==='correoElectronico'?'email': field==='telefono'?'tel': field==='honorarios'?'number':'text'}
                    value={doctor[field]}
                    onChange={handleChange}
                    className="input-doc"
                  />
                </div>
             </div>
            ))}
          </div>

          <div className="doc-btn-actions">
            <button className="doc-btn" type="button" onClick={()=>navigate(-1)}>REGRESAR</button>
            <button className="doc-btn" type="button" onClick={handleSave}>GUARDAR</button>
            <button className="doc-btn" type="button" onClick={handleDelete}>ELIMINAR</button>
          </div>
        </form>
      </motion.section>
    </>
  );
};
