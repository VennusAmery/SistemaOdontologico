import React, { useState } from 'react';
import './historialmedico.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Historialmedico() {
  const navigate = useNavigate();

  // Datos del historial médico
  const [formData, setFormData] = useState({
    id_paciente: '', 
    fecha_registro: '', 
    padecimiento: false,
    tipo_enfermedad: '',
    hospitalizacion: false,
    tipo_hospitalizacion: '',
    usa_medicamentos: false,
    tipos_medicamentos: '',
    alergias: false,
    tipos_alergias: '',
    embarazo: false,
    meses_embarazo: '',
    lactancia: false,
    desarrollo: '',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'radio' ? (value === 'si') : (type === 'checkbox' ? checked : value);
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    console.log('Enviando:', formData); 
    await axios.post('http://localhost:4000/api/historial_medico', formData);
    showFlash('💾 Historial guardado correctamente');
  } catch (error) {
    console.error('Error al guardar historial:', error);
    showFlash('❌ Error al guardar');
  }
};


  const [flashMessage, setFlashMessage] = useState('');
  const showFlash = (text) => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 3000);
  };

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

  const [activeEncabezado, setActiveEncabezado] = useState('/historialmedico');

  return (
    <main className="formulario-content3">
      <h2 className="HistorialMedico-title">Pacientes</h2>
      <hr className="HistorialMedico-hr" />
      <nav className="HistorialMedico-tabs">
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            className={`HistorialMedico-tab ${activeEncabezado === tab.path ? 'active' : ''}`}
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
        className="form-grid3"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}
      >
        <div className="HistorialMedico-container2">
          <div className="HistorialMedico-circle">
            <img src="/imagenes/paciente.png" alt="Proveedor" className="HistorialMedico-image" />
          </div>
          <div className="HistorialMedico-text">
            <h2 className="HistorialMedico-header-title">Historial Médico</h2>
          </div>
        </div>
        <hr className="HistorialMedico-separator" />

        <form onSubmit={handleSubmit}>
          <div className="doble3">
            <div className="campos3">
              <label>DPI Paciente:</label>
              <input type="text" name="id_paciente" value={formData.id_paciente} onChange={handleChange}
              />
            </div>
            <div className="campos3">
              <label>Fecha de Registro:</label>
              <input type="date" name="fecha_registro" value={formData.fecha_registro} onChange={handleChange}
              />
            </div>
          </div>

          <div className="seccion-doble">
            <div className="triple3">
              <div className="camposs2">
                <label>¿Padece alguna enfermedad?:</label>
                <div>
                  <label>
                    <input type="radio" name="padecimiento" value="true" checked={formData.padecimiento === true} onChange={handleChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="padecimiento" value="false" checked={formData.padecimiento === false} onChange={handleChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Cuál?:</label>
                <input type="text" name="tipo_enfermedad" value={formData.tipo_enfermedad} onChange={handleChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Ha sido hospitalizado?:</label>
                <div>
                  <label>
                    <input type="radio" name="hospitalizacion" value="true" checked={formData.hospitalizacion === true} onChange={handleChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="hospitalizacion" value="false" checked={formData.hospitalizacion === false} onChange={handleChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Por qué motivo?:</label>
                <input type="text" name="tipo_hospitalizacion" value={formData.tipo_hospitalizacion} onChange={handleChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Usa medicamentos?:</label>
                <div>
                  <label>
                    <input type="radio" name="usa_medicamentos" value="true" checked={formData.usa_medicamentos === true} onChange={handleChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="usa_medicamentos" value="false" checked={formData.usa_medicamentos === false} onChange={handleChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Qué medicamentos?:</label>
                <input type="text" name="tipos_medicamentos" value={formData.tipos_medicamentos} onChange={handleChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Tiene alergias?:</label>
                <div>
                  <label>
                    <input type="radio" name="alergias" value="true" checked={formData.alergias === true} onChange={handleChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="alergias" value="false" checked={formData.alergias === false} onChange={handleChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Qué alergias?:</label>
                <input type="text" name="tipos_alergias" value={formData.tipos_alergias} onChange={handleChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Está embarazada?:</label>
                <div>
                  <label>
                    <input type="radio" name="embarazo" value="true" checked={formData.embarazo === true} onChange={handleChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="embarazo" value="false" checked={formData.embarazo === false} onChange={handleChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Cuántos meses?:</label>
                <input type="text" name="meses_embarazo" value={formData.meses_embarazo} onChange={handleChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Está en lactancia?:</label>
                <div>
                  <label>
                    <input type="radio" name="lactancia" value="true" checked={formData.lactancia === true} onChange={handleChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="lactancia" value="false" checked={formData.lactancia === false} onChange={handleChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Edad de desarrollo?:</label>
                <input type="text" name="desarrollo" value={formData.desarrollo} onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="HistorialMedico-botones">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            <button type="button" onClick={() => navigate('/agregarpaciente')} className="HistorialMedico-btn-regresar">REGRESAR</button>
            <button type="submit" className="HistorialMedico-btn-guardar">GUARDAR</button>
          </div>
        </form>
      </motion.section>
    </main>
  );
}

export default Historialmedico;