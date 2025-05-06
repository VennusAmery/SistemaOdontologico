import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './infoMaterial.css';
import { motion } from 'framer-motion';

const tabConfig = [
  { id: 'inventario', label: 'Listado de Material', path: '/inventario' },
  { id: 'ingresoMaterial', label: 'Ingreso Material', path: '/ingresoMaterial' },
  { id: 'infoMaterial', label: 'Información de material utilizado', path: '/infoMaterial' },
  { id: 'citaMaterial', label: 'Material usado en cita', path: '/citaMaterial' },
];

const slideVariants = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 }
};

export default function InfoMaterial() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('infoMaterial');

  const [formData, setFormData] = useState({
    idProducto: '',
    nombreProducto: '',
    cantidad: '',
    fechaUso: '',
    idCita: '',
    clinica: '',
    descripcion: ''
  });

  const handleTabClick = tab => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuardar = () => {
    console.log('Guardando datos:', formData);
    // Aquí va la lógica de guardado
  };

  const handleRegresar = () => {
    navigate(-1); // Regresa a la vista anterior
  };

  return (
    <div className="inv-container">
      <h2 className="inv-title">Inventario</h2>
      <hr />

      <div className="inv-tabs">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            className={`inv-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}>
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        className="form-info-material"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >
        <div className="form-grid">
          <div className="form-col">
            <label>ID Producto:</label>
            <input name="idProducto" value={formData.idProducto} onChange={handleChange} />

            <label>Cantidad:</label>
            <input name="cantidad" value={formData.cantidad} onChange={handleChange} />

            <label>Fecha de Uso:</label>
            <input name="fechaUso" value={formData.fechaUso} onChange={handleChange} />

            <label>ID Cita:</label>
            <input name="idCita" value={formData.idCita} onChange={handleChange} />

            <label>Clínica:</label>
            <input name="clinica" value={formData.clinica} onChange={handleChange} />
          </div>

          <div className="form-col">
            <label>Nombre Producto:</label>
            <input name="nombreProducto" value={formData.nombreProducto} onChange={handleChange} />

            <label>Descripción:</label>
            <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} />
          </div>
        </div>

        <div className="form-buttons">
          <button className="btn guardar" onClick={handleGuardar}>GUARDAR</button>
          <button className="btn regresar" onClick={handleRegresar}>REGRESAR</button>
        </div>
      </motion.div>
    </div>
  );
}
