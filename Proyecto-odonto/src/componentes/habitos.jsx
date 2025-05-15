import React, { useState } from 'react';
import './habitos.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

function Habitos() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        id_paciente: '',
        fecha_registro: '',
        rechinar: 0,
        chupar: 0,
        lengua: 0,
        unas: 0,
        morder: 0,
        respirar_boca: 0
    });

    const [activeTab, setActiveTab] = useState('habitos');
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
        transition: { duration: 0.4 }
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
           const response = await axios.post('http://localhost:4000/api/habitos', formData, {
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
        <main className="formulario-content1">
            <h2 className="HabitosPacientes-title">Pacientes</h2>
            <hr className="HabitosPacientes-hr" />

            <nav className="HabitosPacientes-tabs">
                {tabConfig.map(tab => (
                    <button
                        key={tab.id}
                        className={`HabitosPacientes-tab ${activeTab === tab.id ? 'active' : ''}`}
                        onClick={() => {
                            setActiveTab(tab.id);
                            navigate(tab.path);
                        }}>
                        {tab.label}
                    </button>
                ))}
            </nav>

            <motion.section
                className="form-grid1"
                variants={tabVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={tabVariants.transition}>

                <div className="HabitosPacientes-container2">
                    <div className="HabitosPacientes-circle">
                        <img src="/imagenes/paciente.png" alt="Paciente" className="HabitosPacientes-image" />
                    </div>
                    <div className="HabitosPacientes-text">
                        <h2 className="HabitosPacientes-header-title">Hábitos del Paciente</h2>
                    </div>
                </div>
                <hr className="HabitosPacientes-separator" />

                <form onSubmit={handleSave}>
                    <div className="doble1">
                        <div className="campos1">
                            <label>DPI Paciente:</label>
                            <input
                                type="text"
                                name="id_paciente"
                                value={formData.id_paciente}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="campos1">
                            <label>Fecha de Registro:</label>
                            <input
                                type="date"
                                name="fecha_registro"
                                value={formData.fecha_registro}
                                onChange={handleInputChange}
                            />
                        </div>
                    </div>

                      <div className="cuatro1">
                        <div className="camposs">
                          <label>¿Rechinan los dientes?:</label>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="rechinar"
                                value={1}
                                checked={formData.rechinar === 1}
                                onChange={handleInputChange}
                              />
                              Sí
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="rechinar"
                                value={0}
                                checked={formData.rechinar === 0}
                                onChange={handleInputChange}
                              />
                              No
                            </label>
                          </div>
                        </div>

                        <div className="camposs">
                          <label>¿Se come las uñas?:</label>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="unas"
                                value={1}
                                checked={formData.unas === 1}
                                onChange={handleInputChange}
                              />
                              Sí
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="unas"
                                value={0}
                                checked={formData.unas === 0}
                                onChange={handleInputChange}
                              />
                              No
                            </label>
                          </div>
                        </div>

                        <div className="camposs">
                          <label>¿Respira por la boca?:</label>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="respirar_boca"
                                value={1}
                                checked={formData.respirar_boca === 1}
                                onChange={handleInputChange}
                              />
                              Sí
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="respirar_boca"
                                value={0}
                                checked={formData.respirar_boca === 0}
                                onChange={handleInputChange}
                              />
                              No
                            </label>
                          </div>
                        </div>

                        <div className="camposs">
                          <label>¿Se chupa o chupó el dedo gordo u otro dedo o el labio?:</label>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="chupar"
                                value={1}
                                checked={formData.chupar === 1}
                                onChange={handleInputChange}
                              />
                              Sí
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="chupar"
                                value={0}
                                checked={formData.chupar === 0}
                                onChange={handleInputChange}
                              />
                              No
                            </label>
                          </div>
                        </div>

                        <div className="camposs">
                          <label>¿Mantiene la lengua entre los dientes de enfrente?:</label>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="lengua"
                                value={1}
                                checked={formData.lengua === 1}
                                onChange={handleInputChange}
                              />
                              Sí
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="lengua"
                                value={0}
                                checked={formData.lengua === 0}
                                onChange={handleInputChange}
                              />
                              No
                            </label>
                          </div>
                        </div>

                        <div className="camposs">
                          <label>¿Muerde objetos?:</label>
                          <div>
                            <label>
                              <input
                                type="radio"
                                name="morder"
                                value={1}
                                checked={formData.morder === 1}
                                onChange={handleInputChange}
                              />
                              Sí
                            </label>
                            <label>
                              <input
                                type="radio"
                                name="morder"
                                value={0}
                                checked={formData.morder === 0}
                                onChange={handleInputChange}
                              />
                              No
                            </label>
                          </div>
                        </div>
                      </div>

                          <div className="HabitosPacientes-botones">
                        {flashMessage && <div className="flash-message">{flashMessage}</div>}

                        <button type="button" onClick={() => navigate('/agregarpaciente')} className="HabitosPacientes-btn-regresar">
                            REGRESAR
                        </button>
                        <button type="button" className="HabitosPacientes-btn-editar" onClick={() => handleAction('edit')}>
                            EDITAR
                        </button>
                        <button type="button" className="HabitosPacientes-btn-guardar" onClick={() => handleAction('delete')}>
                            ELIMINAR
                        </button>
                        <button type="submit" className="HabitosPacientes-btn-guardar">
                            GUARDAR
                        </button>
                    </div>
                </form>
            </motion.section>
        </main>
    );
}

export default Habitos;

