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
    padecimiento: 0,
    tipo_enfermedad: '',
    hospitalizacion: 0,
    tipo_hospitalizacion: '',
    usa_medicamentos: 0,
    tipos_medicamentos: '',
    alergias: 0,
    tipos_alergias: '',
    embarazo: 0,
    meses_embarazo: '',
    lactancia: 0,
    desarrollo: '',
  });

      const [activeTab, setActiveTab] = useState('historialMed');
      const [flashMessage, setFlashMessage] = useState('');

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
    const showFlash = (text) => {
        setFlashMessage(text);
        setTimeout(() => setFlashMessage(''), 3000);
    };

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'radio' ? parseInt(value) : value
        }));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (!formData.id_paciente || !formData.fecha_registro) {
            showFlash('❌ DPI y Fecha son obligatorios');
            return;
        }

        try {
           const response = await axios.post('http://localhost:4000/api/historialmedico', formData, {
            headers: { 'Content-Type': 'application/json' }
          });

            if (response.status === 201) {
                showFlash('💾 Guardado correctamente');
                // Opcional: resetear el formulario
                // setFormData({...formData, fecha_registro: '', rechinar: 0, chupar: 0, etc...});
            }
        } catch (error) {
            console.error('Error al guardar:', error);
            const errorMsg = error.response?.data?.error || 'Error en el servidor';
            showFlash(`❌ ${errorMsg}`);
        }
    };


  const handleAction = (action) => {
        showFlash(action === 'edit' ? '🖋️ Editado correctamente' : '🗑️ Eliminado correctamente');
    };

  return (
    <main className="formulario-content3">
      <h2 className="HistorialMedico-title">Pacientes</h2>
      <hr className="HistorialMedico-hr" />
      <nav className="HistorialMedico-tabs">
        {tabConfig.map((tab) => (
          <button
            key={tab.id}
            className={`HistorialMedico-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.path);
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

        <form onSubmit={handleSave}>
          <div className="doble3">
            <div className="campos3">
              <label>DPI Paciente:</label>
              <input type="text" name="id_paciente" value={formData.id_paciente} onChange={handleInputChange}
              />
            </div>
            <div className="campos3">
              <label>Fecha de Registro:</label>
              <input type="date" name="fecha_registro" value={formData.fecha_registro} onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="seccion-doble">
            <div className="triple3">
              <div className="camposs2">
                <label>¿Padece alguna enfermedad?:</label>
                <div>
                  <label>
                    <input type="radio" name="padecimiento" value={1} checked={formData.padecimiento === 1} onChange={handleInputChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="padecimiento" value={0} checked={formData.padecimiento === 0} onChange={handleInputChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Cuál?:</label>
                <input type="text" name="tipo_enfermedad" value={formData.tipo_enfermedad} onChange={handleInputChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Usa medicamentos?:</label>
                <div>
                  <label>
                    <input type="radio" name="usa_medicamentos" value={1} checked={formData.usa_medicamentos === 1} onChange={handleInputChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="usa_medicamentos" value={0} checked={formData.usa_medicamentos === 0} onChange={handleInputChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Cuál?:</label>
                <input type="text" name="tipos_medicamentos" value={formData.tipos_medicamentos} onChange={handleInputChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Alergia a medicamentos?:</label>
                <div>
                  <label>
                    <input type="radio" name="alergias" value={1} checked={formData.alergias === 1} onChange={handleInputChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="alergias" value={0} checked={formData.alergias === 0} onChange={handleInputChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Cuál?:</label>
                <input type="text" name="tipos_alergias" value={formData.tipos_alergias} onChange={handleInputChange}
                />
              </div>
            </div>

              <div className='cuatro3'>
              <div className="camposs2">
                <label>¿Ha sido hospitalizado en los ultimos 2 años?:</label>
                <div>
                  <label>
                    <input type="radio" name="hospitalizacion" value={1} checked={formData.hospitalizacion === 1} onChange={handleInputChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="hospitalizacion" value={0} checked={formData.hospitalizacion === 0} onChange={handleInputChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Por qué?:</label>
                <input type="text" name="tipo_hospitalizacion" value={formData.tipo_hospitalizacion} onChange={handleInputChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Está embarazada o cree estarlo?:</label>
                <div>
                  <label>
                    <input type="radio" name="embarazo" value={1} checked={formData.embarazo === 1} onChange={handleInputChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="embarazo" value={0} checked={formData.embarazo === 0} onChange={handleInputChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Cuántos meses?:</label>
                <input type="text" name="meses_embarazo" value={formData.meses_embarazo} onChange={handleInputChange}
                />
              </div>
              <div className="camposs2">
                <label>¿Está en lactancia?:</label>
                <div>
                  <label>
                    <input type="radio" name="lactancia" value={1} checked={formData.lactancia === 1} onChange={handleInputChange}
                    />Sí</label>
                  <label>
                    <input type="radio" name="lactancia" value={0} checked={formData.lactancia === 0} onChange={handleInputChange}
                    />No</label>
                </div>
              </div>
              <div className="camposs2">
                <label>¿Edad de desarrollo?:</label>
                <input type="text" name="desarrollo" value={formData.desarrollo} onChange={handleInputChange}
                />
              </div>
            </div>
          </div>

          <div className="HistorialMedico-botones">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            <button type="button" onClick={() => navigate('/historialodontologico')} className="HistorialMedico-btn-regresar">REGRESAR</button>
            <button type="submit" className="HistorialMedico-btn-guardar">GUARDAR</button>
          </div>
        </form>
      </motion.section>
    </main>
  );
}

export default Historialmedico;