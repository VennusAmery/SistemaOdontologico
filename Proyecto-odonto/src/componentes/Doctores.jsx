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

  const handleChange = (e) => {container
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

  return (
    <>
      <h2>Contactos</h2>
      <hr />
      <hr />

      <div className="doc-header">
        <div className="doc-title-">
          <div className="doc-icon-circle">
            <img src="/imagenes/iconoUsuario.png" alt="Doctores" className="doc-icon-img" />
          </div>
          <h3 className="doc-title">Doctores</h3>
        </div>
      </div>

      <nav className="tabs">
        <button className="active">Información</button>
      </nav>

      <form className="doc-form">
        <div className="doc-form-row">
          <div className="doc-form-group">
            <div className="doc-field">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={doctor.nombre} onChange={handleChange} />
            </div>

            <div className="doc-field">
              <label>Apellido:</label>
              <input type="text" name="apellido" value={doctor.apellido} onChange={handleChange} />
            </div>

            <div className="doc-field">
              <label>DPI:</label>
              <input type="text" name="dpi" value={doctor.dpi} onChange={handleChange} />
            </div>

            <div className="doc-field">
              <label>Hora de Entrada:</label>
              <div className="doc-time-wrapper">
                <input
                  type="time"
                  name="horaEntrada"
                  value={doctor.horaEntrada}
                  onChange={handleChange} />
                <img src="/imagenes/reloj.png" alt="Reloj" className="doc-time-icon" />
              </div>
            </div>
          </div>

          <div className="doc-form-group">
            <div className="doc-field">
              <label>Especialidad:</label>
              <input type="text" name="especialidad" value={doctor.especialidad} onChange={handleChange} />
            </div>

            <div className="doc-field">
              <label>Honorarios:</label>
              <input type="text" name="honorarios" value={doctor.honorarios} onChange={handleChange} />
            </div>

            <div className="doc-field">
              <label>Clínica:</label>
              <input type="text" name="clinica" value={doctor.clinica} onChange={handleChange} />
            </div>

            <div className="doc-field">
              <label>Hora de Salida:</label>
              <div className="doc-time-wrapper">
                <input
                  type="time"
                  name="horaSalida"
                  value={doctor.horaSalida}
                  onChange={handleChange}/>
                <img src="/imagenes/reloj.png" alt="Reloj" className="doc-time-icon" />
              </div>
            </div>
          </div>
        </div>

        <nav className="tabs">
        <button className="active">Contacto</button>
      </nav>

        <div className="doc-form-row2">
          <div className="doc-field2">
            <label>Teléfono:</label>
            <input type="text" name="telefono" value={doctor.telefono} onChange={handleChange} />
          </div>

          <div className="doc-field2">
            <label>Móvil:</label>
            <input type="text" name="movil" value={doctor.movil} onChange={handleChange} />
          </div>

          <div className="doc-field2">
            <label>Correo:</label>
            <input type="email" name="correoElectronico" value={doctor.correoElectronico} onChange={handleChange} />
          </div>
        </div>

        <div className="doc-btn-actions">
          <button className="doc-btn" type="button" onClick={handleBack}>REGRESAR</button>
          <button className="doc-btn" type="button" onClick={handleSave}>GUARDAR</button>
          <button className="doc-btn" type="button" onClick={handleEdit}>EDITAR</button>
          <button className="doc-btn" type="button" onClick={handleDelete}>ELIMINAR</button>
        </div>
      </form>
    </>
  );
};

export default Doctores;
