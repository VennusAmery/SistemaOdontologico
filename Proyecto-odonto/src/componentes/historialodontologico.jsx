import React, { useState, useEffect } from 'react';
import './historialodontologico.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Historialodontologico() {
  const navigate = useNavigate();

const [formData, setFormData] = useState({
        id_paciente: '',
        fecha_registro: '',
        motivo_consulta: '',
        fecha_ultima_consulta: '',
        dolor: 0,
        dientes_dolor: '',
        sangrado: 0,
        antecedentes_familiares: ''
    });

      const [activeTab, setActiveTab] = useState('historialOdont');
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
           const response = await axios.post('http://localhost:4000/api/historialodonto', formData, {
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
    <main className="formulario-content2">
      <h2 className="HistorialOdonto-title">Pacientes</h2>
      <hr className="HistorialOdonto-hr" />

      <nav className="HistorialOdonto-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`HistorialOdonto-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab.path);
              navigate(tab.path);
            }}>
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="form-grid2"
        variants={tabVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={tabVariants.transition}
      >
        <div className="HistorialOdonto-container2">
          <div className="HistorialOdonto-circle">
            <img src="/imagenes/paciente.png" alt="Paciente" className="HistorialOdonto-image" />
          </div>
          <div className="HistorialOdonto-text">
            <h2 className="HistorialOdonto-header-title">Historial Odontológico</h2>
          </div>
        </div>

        <hr className="HistorialOdonto-separator" />

<form onSubmit={handleSave}>
  <div className="doble2">
    <div className="campos2">
      <label>DPI Paciente:</label>
      <input
        type="text"
        name="id_paciente" 
        value={formData.id_paciente}
        onChange={handleInputChange}
      />
    </div>

    <div className="campos2">
      <label>Fecha de Registro:</label>
      <input
        type="date"
        name="fecha_registro" 
        value={formData.fecha_registro}
        onChange={handleInputChange}
      />
    </div>
  </div>

  <div className="triple1">
    <div className="camposs1">
      <label>¿Cuándo fue su última visita al odontólogo?</label>
      <input
        type="date"
        name="fecha_ultima_consulta"
        value={formData.fecha_ultima_consulta}
        onChange={handleInputChange}
      />
    </div>

    <div className="camposs1">
      <label>¿Cuál fue el motivo?</label>
      <input
        type="text"
        name="motivo_consulta"
        value={formData.motivo_consulta}
        onChange={handleInputChange}
      />
    </div>
  </div>

  <div className="cuatro2">
    <div className="camposs1">
      <label>¿Tiene dolor en algún diente o muela?</label>
      <div>
        <label>
          <input
            type="radio"
            name="dolor" 
            value={1}
            checked={formData.dolor === 1}
            onChange={handleInputChange}
          />
          Sí
        </label>
        <label>
          <input
            type="radio"
            name="dolor" 
            value={0}
            checked={formData.dolor === 0}
            onChange={handleInputChange}
          />
          No
        </label>
      </div>
    </div>

    <div className="camposs1">
      <label>¿Cuál es?</label>
      <input
        type="text"
        name="dientes_dolor"
        value={formData.dientes_dolor}
        onChange={handleInputChange}
      />
    </div>

    <div className="camposs1">
      <label>¿Sangran las encías al cepillado?</label>
      <div>
        <label>
          <input
            type="radio"
            name="sangrado"
            value={1}
            checked={formData.sangrado === 1}
            onChange={handleInputChange}
          />
          Sí
        </label>
        <label>
          <input
            type="radio"
            name="sangrado" 
            value={0}
            checked={formData.sangrado === 0}
            onChange={handleInputChange}
          />
          No
        </label>
      </div>
    </div>

    <div className="camposs1">
        <label>¿Algún miembro de su familia tiene el mismo problema de</label>
        <label>malposición de los dientes y forma que encaja la mordida?</label>
      <input
        type="text"
        name="antecedentes_familiares" 
        value={formData.antecedentes_familiares}
        onChange={handleInputChange}
      />
    </div>
  </div>

  <div className="HistorialOdontologico-botones">
    {flashMessage && <div className="flash-message">{flashMessage}</div>}

    <button
      type="button"
      onClick={() => navigate('/habitos')}
      className="HistorialOdontologico-btn-regresar"
    >
      REGRESAR
    </button>
    <button type="submit" className="HistorialOdontologico-btn-guardar">
      GUARDAR
    </button>
  </div>
</form>
      </motion.section>
    </main>
  );
}

export default Historialodontologico;


