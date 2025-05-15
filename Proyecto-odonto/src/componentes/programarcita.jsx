import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import './programarcita.css';

function ProgramarCita() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams(); // Para editar una cita existente
  const [flashMessage, setFlashMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [citaData, setCitaData] = useState({
    id_paciente: '',
    codigo_clinica: '',
    doctor_encargado: '',
    hora: '',
    fecha: '',
    monto_a_cobrar: ''
  });

  // Cargar datos de la cita si estamos editando
  useEffect(() => {
    if (id) {
      const fetchCita = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:4000/api/cita/${id}`);
          setCitaData({
            ...response.data,
            fecha: response.data.fecha.split('T')[0] // Formatear fecha para input date
          });
        } catch (error) {
          showFlash('❌ Error al cargar la cita');
          console.error('Error fetching cita:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCita();
    }
  }, [id]);

  const tabConfig = [
    { id: 'listadoMaterial', label: 'Historial Citas', path: '/citas' },
    { id: 'nuevaCita', label: 'Nueva Cita', path: '/programarcita' },
  ];

  const slideVariants = {
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
    const { name, value } = e.target;
    setCitaData({
      ...citaData,
      [name]: value
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (id) {
        // Actualizar cita existente
        await axios.put(`http://localhost:4000/api/cita/${id}`, citaData);
        showFlash('💾 Cita actualizada correctamente');
      } else {
        // Crear nueva cita
        await axios.post('http://localhost:4000/api/cita', citaData);
        showFlash('💾 Cita guardada correctamente');
        // Limpiar formulario después de guardar
        setCitaData({
          id_paciente: '',
          codigo_clinica: '',
          doctor_encargado: '',
          hora: '',
          fecha: '',
          monto_a_cobrar: ''
        });
      }
    } catch (error) {
      showFlash('❌ Error al guardar la cita');
      console.error('Error saving cita:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!id) {
      showFlash('ℹ️ Guarda la cita primero antes de confirmar');
      return;
    }
    
    setIsLoading(true);
    try {
      // Aquí podrías implementar lógica adicional para confirmar la cita
      // Por ejemplo, enviar un correo de confirmación o cambiar el estado
      showFlash('✅ Cita confirmada correctamente');
    } catch (error) {
      showFlash('❌ Error al confirmar la cita');
      console.error('Error confirming cita:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!id) {
      showFlash('ℹ️ No hay cita para eliminar');
      return;
    }
    
    if (!window.confirm('¿Estás seguro de eliminar esta cita?')) {
      return;
    }
    
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:4000/api/cita/${id}`);
      showFlash('🗑️ Cita eliminada correctamente');
      navigate('/citas'); // Redirigir al listado después de eliminar
    } catch (error) {
      showFlash('❌ Error al eliminar la cita');
      console.error('Error deleting cita:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="programarcita-content">
      <h1 className="programarcita-titulo">Citas</h1>
      <hr />

      {/* ——— Tabs ——— */}
      <nav className="programarcita-tabs" aria-label="Secciones de Citas">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`programarcita-tab ${location.pathname === tab.path ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="programarcita-section"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={slideVariants}
      >
        <form className="programarcita-formulario">
          <div className="programarcita-form-grid">
            {/* Columna 1 */}
            <div>
              <label htmlFor="id_paciente">DPI Paciente:</label>
              <input
                type="text"
                id="id_paciente"
                name="id_paciente"
                value={citaData.id_paciente}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="doctor_encargado">Doctor encargado:</label>
              <input
                type="text"
                id="doctor_encargado"
                name="doctor_encargado"
                value={citaData.doctor_encargado}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="fecha">Fecha:</label>
              <input
                type="date"
                id="fecha"
                name="fecha"
                value={citaData.fecha}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Columna 2 */}
            <div>
              <label htmlFor="codigo_clinica">Código Clínica:</label>
              <input
                type="text"
                id="codigo_clinica"
                name="codigo_clinica"
                value={citaData.codigo_clinica}
                onChange={handleInputChange}
              />

              <label htmlFor="hora">Hora:</label>
              <input
                type="time"
                id="hora"
                name="hora"
                value={citaData.hora}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="monto_a_cobrar">Monto a Cobrar:</label>
              <input
                type="number"
                id="monto_a_cobrar"
                name="monto_a_cobrar"
                value={citaData.monto_a_cobrar}
                onChange={handleInputChange}
                step="0.01"
                min="0"
              />
            </div>
          </div> 

          <div className="programarcita-botones">
            {flashMessage && <div className="flash-message">{flashMessage}</div>}
            {isLoading && <div className="loading-indicator">Cargando...</div>}
            
            <button 
              type="button" 
              className="programarcita-btn-guardar" 
              onClick={handleSave}
              disabled={isLoading}
            >
              {id ? 'ACTUALIZAR' : 'GUARDAR'}
            </button>
            
            <button 
              type="button" 
              className="programarcita-btn-confirmar" 
              onClick={handleConfirm}
              disabled={isLoading || !id}
            >
              CONFIRMAR
            </button>
            
            {id && (
              <button 
                type="button" 
                className="programarcita-btn-eliminar" 
                onClick={handleDelete}
                disabled={isLoading}
              >
                ELIMINAR
              </button>
            )}
            
            <button 
              type="button" 
              className="programarcita-btn-regresar" 
              onClick={() => navigate('/citas')}
              disabled={isLoading}
            >
              REGRESAR
            </button>
          </div>
        </form>
      </motion.section>
    </div>
  );
}

export default ProgramarCita;
