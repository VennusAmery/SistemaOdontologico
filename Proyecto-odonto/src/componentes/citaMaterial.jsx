import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './citaMaterial.css';

const tabItems = [
  { id: 'listado', label: 'Listado de Material', path: '/inventario' },
  { id: 'ingreso', label: 'Ingreso Material', path: '/ingresoMaterial' },
  { id: 'info', label: 'Información de material utilizado', path: '/infoMaterial' },
  { id: 'cita', label: 'Material usado en cita', path: '/citaMaterial' },
];

// Variantes para solo barrido horizontal
const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit:    { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 }
};

export default function CitaMaterial() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('cita');
  const [busqueda, setBusqueda] = useState('');
  const [citaID, setCitaID] = useState('');
  const [formData, setFormData] = useState({
    idProducto: '',
    nombreProducto: '',
    cantidad: '',
    fechaUso: '',
    clinica: '',
    descripcion: ''
  });

  const onTabClick = tab => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  const onChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBuscar = () => {
    // Simulación de asignar una cita encontrada
    setCitaID(busqueda);
  };

  const onSave = () => {
    console.log('Datos guardados:', formData, 'para cita:', citaID);
  };

  const onBack = () => {
    navigate(-1);
  };

  return (
    <div className="inv-container">
      <h2 className="inv-title">Inventario</h2>
      <hr />

      <nav className="inv-tabs" aria-label="Secciones de Inventario">
        {tabItems.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`inv-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => onTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.div
        className="inv-card"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >
        {/* Cuerpo con animación */}
        <div className="buscar-section">
          <label htmlFor="buscarCita">Buscar Cita:</label>
          <input
            id="buscarCita"
            type="text"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <button className="inv-btn inv-btn--buscar" onClick={handleBuscar}>BUSCAR</button>
        </div>

        <div className="cita-id-section">
          <label>ID Cita:</label>
          <input 
          type="text" 
          onChange={e => setBusqueda(e.target.value)}/>
        </div>

        <div className="tabla-material">
          <div className="tabla-header">
            <div>Material</div>
            <div>Cantidad Usada</div>
            <div>Unidad</div>
          </div>
          <div className="tabla-datos">
            {/* Aquí puedes mapear los materiales según la cita */}
            <div className="tabla-fila">
              <div>Ejemplo Material</div>
              <div>2</div>
              <div>ml</div>
            </div>
          </div>
        </div>

        {/* ——— Botones de acción ——— */}
        <div className="citaM-form-buttons">
          <button type="button" className="inv-btn-delete">Eliminar</button>
          <button type="button" className="inv-btn-edit">Modificar</button>
          <button type="button" className="inv-btn-add">Agregar</button>
          <button type="button" className="inv-btn-back"onClick={() => navigate(-1)}>Regresar </button>
        </div>
      </motion.div>
    </div>
  );
}
