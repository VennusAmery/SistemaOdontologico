import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './agregarempleado.css';
import axios from 'axios';

function AgregarEmpleado() {
  const navigate = useNavigate();
  const { id } = useParams();

  const tabConfig = [
    { id: 'listadoMaterial', label: 'Listado de Empleados', path: '/empleados' },
    { id: 'ingresoMaterial', label: id ? 'Editar Empleado' : 'Agregar Empleado', path: id ? `/empleados/${id}` : '/agregarempleado' },
  ];

  const [tabActiva, setTabActiva] = useState(tabConfig[1].id);
  const [flashMessage, setFlashMessage] = useState('');
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(!!id);
  const [error, setError] = useState(null);

  // State keys match backend expected names
  const [empleado, setEmpleado] = useState({
    dpi: '', nombre: '', apellido: '', fechaNacimiento: '', direccion: '', edad: '',
    cargo: '', sueldo: '', turno: 'Mañana', horaEntrada: '', horaSalida: '',
    clinica: '', telefono: '', correoElectronico: ''
  });

  useEffect(() => {
    if (!id) return setLoading(false);
    axios.get(`http://localhost:4000/api/empleadoinfo/${id}`)
      .then(res => {
        const d = res.data;
        setEmpleado({
          dpi: d.dpi || '', nombre: d.nombre || '', apellido: d.apellido || '',
          fechaNacimiento: d.fecha_nacimiento || '', direccion: d.direccion || '',
          edad: d.edad || '', cargo: d.cargo || '', sueldo: d.sueldo || '',
          turno: d.turno || 'Mañana', horaEntrada: d.hora_entrada || '',
          horaSalida: d.hora_salida || '', clinica: d.id_clinica || '',
          telefono: d.telefono || '', correoElectronico: d.correo || ''
        });
      })
      .catch(err => setError(err.response?.data?.error || err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setEmpleado(prev => ({ ...prev, [name]: value }));
  };


  const handleTabClick = tab => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const handleSave = () => {
    setSaving(true);
    const fn = id
      ? axios.put(`http://localhost:4000/api/agregarempleado/${id}`, empleado)
      : axios.post(`http://localhost:4000/api/agregarempleado`, empleado);
    fn.then(() => {
      
      setFlashMessage(id ? '🖋️ Editado correctamente' : '💾 Guardado correctamente');
      navigate('/empleados');
    })
    .catch(err => alert('Error al guardar: ' + (err.response?.data?.error || err.message)))
    .finally(() => setSaving(false));
  };

  const handleDelete = () => {
    if (!id || !window.confirm('¿Eliminar este empleado?')) return;
    axios.delete(`http://localhost:4000/api/agregarempleado/${id}`)
      .then(() => { flashMessage('🗑️ Eliminado correctamente'); navigate('/empleados'); })
      .catch(err => alert('Error al eliminar: ' + (err.response?.data?.error || err.message)));
  };

  if (loading) return <p>Cargando datos…</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="empleinfo-container">
      <h2 className="empleinfo-title">Empleados</h2>
      <hr />

      <nav className="empleinfo-tabs" aria-label="Secciones de Empleados">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`empleinfo-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="tab-content"
      >
        <div className="AgregarEmple-container2">
          <div className="AgregarEmple-circle">
            <img src="/imagenes/Trabajador.png" alt="Trabajador" className="AgregarEmple-image" />
          </div>
          <div className="AgregarEmple-text">
            <h2 className="TituloAgregarEmple">Información del Empleado</h2>
          </div>
        </div>
        <hr className="hringreso" />

        {flashMessage && <div className="flash-message">{flashMessage}</div>}
<form className="agregar-empleado-form grid-2cols" onSubmit={e=>{e.preventDefault(); handleSave();}}>
  <div className="col">
    {[
      ['dpi','text'], ['nombre','text'], ['apellido','text'],
      ['fechaNacimiento','date'], ['direccion','text'], ['edad','number'],
      ['cargo','text']
    ].map(([f,t]) => (
      <div className="field" key={f}>
        <label htmlFor={f}>{f.replace(/([A-Z])/g, ' $1')}</label>
        <input
          id={f}
          name={f}
          type={t}
          value={empleado[f] || ''}
          onChange={handleChange}
          className="agregar-empleado-input"
        />
      </div>
    ))}
  </div>
  <div className="col">
    {[
      ['sueldo','number'], ['turno','text'], ['horaEntrada','time'],
      ['horaSalida','time'], ['clinica','number'], ['telefono','text'],
      ['correoElectronico','email']
    ].map(([f,t]) => (
      <div className="field" key={f}>
        <label htmlFor={f}>{f.replace(/([A-Z])/g, ' $1')}</label>
        <input
          id={f}
          name={f}
          type={t}
          value={empleado[f] || ''}
          onChange={handleChange}
          className="agregar-empleado-input"
        />
      </div>
    ))}


              <div className="col form-buttons">
            {id && <button type="button" className="ingreEMPLEADO-btn-delete" onClick={handleDelete}>ELIMINAR</button>}
            <button type="submit" className="ingreEMPLEADO-btn-add" disabled={saving}>
              {saving? 'Guardando…' : (id?'EDITAR':'AGREGAR')}
            </button>
            <button type="button" className="ingreEMPLEADO-btn-back" onClick={()=>navigate(-1)}>REGRESAR</button>
          </div>
  </div>
</form>


      </motion.section>
    </div>
  );
}

export default AgregarEmpleado;
