import React, { useState } from 'react';
import './Doctores.css';
import { useNavigate } from 'react-router-dom';

const Doctores = () => {
  const navigate = useNavigate();
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
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSave = () => {
    console.log("Guardado:", doctor);
    alert("Guardado correctamente");
  };

  const handleEdit = () => {
    console.log("Editado:", doctor);
  };

  const handleDelete = () => {
    console.log("Eliminado:", doctor);
    alert("Doctor eliminado");
  };

  const handleBack = () => {
    navigate('/contactos');
  };

  const handleTimeChange = (name, dates) => {
    const date = dates[0];
    const hours = date.getHours().toString().padStart(2,'0');
    const mins = date.getMinutes().toString().padStart(2,'0');
    setDoctor(prev => ({ ...prev, [name]: `${hours}:${mins}` }));
  };


  return (
    <>
      {/* ENCABEZADO */}
      <h3>Contactos</h3>
      <hr />
      <hr />

      <div className="doctores-header">
        <div className="doctores-title">
          <div className="icon-circle">
            <img src="/imagenes/iconoUsuario.png" alt="Doctores" className="circle-image" />
          </div>
          <h3 className="titulo-doctores">Doctores</h3>
        </div>
      </div>

      {/* BOTÓN INFORMACIÓN */}
      <div className="section info-button-section">
        <button className="info-button">Información</button>
        <hr />
      </div>

      <form className="doctor-form">
        <div className="form-row">
          <div className="form-group">
            <div className="form-field">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={doctor.nombre} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label>Apellido:</label>
              <input type="text" name="apellido" value={doctor.apellido} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label>DPI:</label>
              <input type="text" name="dpi" value={doctor.dpi} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label>Hora de Entrada:</label>
              <div className="input-time-wrapper">
                <input
                  type="time"
                  name="horaEntrada"
                  value={doctor.horaEntrada}
                  onChange={handleChange}/>
                <img src="/imagenes/reloj.png" alt="Icono reloj" className="custom-icon" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="form-field">
              <label>Especialidad:</label>
              <input type="text" name="especialidad" value={doctor.especialidad} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label>Honorarios:</label>
              <input type="number" name="honorarios" value={doctor.honorarios} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label>Clínica:</label>
              <input type="text" name="clinica" value={doctor.clinica} onChange={handleChange} />
            </div>

            <div className="form-field">
              <label>Hora de Salida:</label>
              <div className="input-time-wrapper">
                <input
                  type="time"
                  name="horaSalida"
                  value={doctor.horaSalida}
                  onChange={handleChange}/>
                <img src="/imagenes/reloj.png" alt="Icono reloj" className="custom-icon" />
              </div>
            </div>
          </div>
        </div>

        {/* BOTÓN CONTACTO */}
        <div className="section info-button-section">
          <button className="info-button">Contacto</button>
          <hr />
        </div>

        <div className="form-row2">
          <div className="form-field2">
            <label>Teléfono:</label>
            <input type="text" name="telefono" value={doctor.telefono} onChange={handleChange} />
          </div>

          <div className="form-field2">
            <label>Móvil:</label>
            <input type="text" name="movil" value={doctor.movil} onChange={handleChange} />
          </div>

          <div className="form-field2">
            <label>Correo:</label>
            <input type="email" name="correoElectronico" value={doctor.correoElectronico} onChange={handleChange} />
          </div>
        </div>

        <div className="action-buttons">
          <button className="btn" type="button" onClick={handleBack}>REGRESAR</button>
          <button className="btn" type="button" onClick={handleSave}>GUARDAR</button>
          <button className="btn" type="button" onClick={handleEdit}>EDITAR</button>
          <button className="btn" type="button" onClick={handleDelete}>ELIMINAR</button>
        </div>
      </form>
    </>
  );
};

export default Doctores;