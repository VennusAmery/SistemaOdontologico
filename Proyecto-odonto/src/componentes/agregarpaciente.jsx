import React, { useState, useEffect } from 'react';
import './agregarpaciente.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';

function AgregarPaciente() {
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState('');

  const [formData, setFormData] = useState({
    dpi: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    sexo: '',
    estado_civil: '',
    ocupacion: '',
    motivo_consulta: '',
    edad: '',
    telefono_movil: '',
    telefono_fijo: '',
    telefono_trabajo: '',
    correo: '',
    direccion_casa: '',
    direccion_trabajo: ''
  });

  const tabConfig = [
    { id: 'listadoPaciente', label: 'Listado', path: '/pacientes' },
    { id: 'infoPaciente', label: 'Información de paciente', path: '/agregarpaciente' },
    { id: 'habitos', label: 'Hábitos', path: '/habitos' },
    { id: 'historialOdont', label: 'Historial Odontológico', path: '/historialodontologico' },
    { id: 'historialMed', label: 'Historial Médico', path: '/historialmedico' },
    { id: 'fotografias', label: 'Fotografías', path: '/fotografias' },
    { id: 'tratamiento', label: 'Tratamiento', path: '/tratamiento' },
  ];

  const showFlash = text => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 2000);
  };

const handleChange = e => {
  const { name, value } = e.target;

  setFormData(prev => ({
    ...prev,
    [name]: value
  }));
};


const handleSave = async (e) => {
  e.preventDefault(); // Prevenir recarga del formulario

  const pacienteData = {
    paciente: {
      dpi: formData.dpi,
      nombre: formData.nombre,
      apellido: formData.apellido,
      fecha_nacimiento: formData.fecha_nacimiento,
      edad: parseInt(formData.edad),
      sexo: formData.sexo,
      estado_civil: formData.estado_civil,
      ocupacion: formData.ocupacion,
      motivo_consulta: formData.motivo_consulta,
    },
    contacto: {
      telefono_movil: formData.telefono_movil,
      telefono_fijo: formData.telefono_fijo,
      telefono_trabajo: formData.telefono_trabajo,
      correo: formData.correo,
    },
    direccion: {
      direccion_casa: formData.direccion_casa,
      direccion_trabajo: formData.direccion_trabajo,
    }
  };

  try {
    const response = await axios.post('http://localhost:4000/api/pacientes', pacienteData);
    showFlash('✅ Paciente guardado');
    handleReset();
    console.log('Paciente guardado:', response.data);
  } catch (error) {
    console.error('Error al guardar paciente:', error);
    showFlash('❌ Error al guardar paciente');
  }
};



  const handleReset = () => {
  setFormData({
    dpi: '',
    nombre: '',
    apellido: '',
    fecha_nacimiento: '',
    sexo: '',
    estado_civil: '',
    ocupacion: '',
    motivo_consulta: '',
    edad: '',
    telefono_movil: '',
    telefono_fijo: '',
    telefono_trabajo: '',
    correo: '',
    direccion_casa: '',
    direccion_trabajo: ''
  });
  showFlash('💾 Guardado correctamente');
};


  return (
    <main className="formulario-content">
      <h2 className="agregarpaciente-title">Pacientes</h2>
      <hr className="agregarpaciente-hr" />

      <nav className="agregarpaciente-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`agregarpaciente-tab ${tab.path === '/agregarpaciente' ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="form-grid"
        initial={{ x: '100%', opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: '-100%', opacity: 0 }}
        transition={{ duration: 0.4 }}>

        <div className="agregarpaciente-container2">
          <div className="agregarpaciente-circle">
            <img src="/imagenes/paciente.png" alt="Paciente" className="agregarpaciente-image" />
          </div>
          <div className="agregarpaciente-text">
            <h2 className="agregarpaciente-header-title">Información Pacientes</h2>
          </div>
        </div>
        <hr className="agregarpaciente-separator" />

        <form onSubmit={handleSave}>
          <div className="triple">
            <div className="campos"><label>DPI:</label><input type="text" name="dpi" value={formData.dpi} onChange={handleChange} /></div>
            <div className="campos"><label>Nombre:</label><input type="text" name="nombre" value={formData.nombre} onChange={handleChange} /></div>
            <div className="campos"><label>Apellido:</label><input type="text" name="apellido" value={formData.apellido} onChange={handleChange} /></div>
          </div>

          <div className="cuatro">
            <div className="campos">
              <label>Fecha de Nacimiento:</label>
              <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} onChange={handleChange} />
            </div>
            <div className="campos">
              <label>Edad:</label>
              <input
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
              />
            </div>
            <div className="campos"><label>Sexo:</label><input type="text" name="sexo" value={formData.sexo} onChange={handleChange} /></div>
            <div className="campos"><label>Estado Civil:</label><input type="text" name="estado_civil" value={formData.estado_civil} onChange={handleChange} /></div>
          </div>

          <div className="doble">
            <div className="campos"><label>Correo Electrónico:</label><input type="email" name="correo" value={formData.correo} onChange={handleChange} /></div>
            <div className="campos"><label>Ocupación:</label><input type="text" name="ocupacion" value={formData.ocupacion} onChange={handleChange} /></div>
          </div>

          <div className="triple2">
            <div className="campos"><label>Teléfono Móvil:</label><input type="text" name="telefono_movil" value={formData.telefono_movil} onChange={handleChange} /></div>
            <div className="campos"><label>Teléfono Fijo:</label><input type="text" name="telefono_fijo" value={formData.telefono_fijo} onChange={handleChange} /></div>
            <div className="campos"><label>Teléfono Trabajo:</label><input type="text" name="telefono_trabajo" value={formData.telefono_trabajo} onChange={handleChange} /></div>
          </div>

          <div className="doble2">
          <div className="campos">
            <label>Dirección:</label>
            <input
              type="text"
              name="direccion_casa"
              value={formData.direccion_casa}
              onChange={handleChange}
            />
          </div>
            <div className="campos"><label>Dirección Trabajo:</label><input type="text" name="direccion_trabajo" value={formData.direccion_trabajo} onChange={handleChange} /></div>
          </div>

          <div className="wide">
            <div className="campos"><label>Motivo de Consulta:</label><input type="text" name="motivo_consulta" value={formData.motivo_consulta} onChange={handleChange} /></div>
          </div>


          <div className="agregarpaciente-buttons">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}

            <button type="button" className="agregarpaciente-btn regresar" onClick={() => navigate(-1)}>REGRESAR</button>
            <button type="button" className="agregarpaciente-btn eliminar" onClick={handleReset}>ELIMINAR</button>
            <button type="submit" className="agregarpaciente-btn guardar">GUARDAR</button>
          </div>
        </form>
      </motion.section>
    </main>
  );
}

export default AgregarPaciente;