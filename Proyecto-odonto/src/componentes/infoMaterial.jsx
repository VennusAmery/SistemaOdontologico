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

  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');

  // Simulación de datos
  const datos = ['Algodón', 'Gasas', 'Guantes', 'Jeringa', 'Alcohol'];
  const filtered = datos.filter(d =>
    d.toLowerCase().includes(displayTerm.toLowerCase())
  );
  const agrupados = filtered.reduce((acc, item) => {
    const letra = item[0].toUpperCase();
    if (!acc[letra]) acc[letra] = [];
    acc[letra].push(item);
    return acc;
  }, {});

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
            onClick={() => handleTabClick(tab)}
          >
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
        <form
          className="inv-search-form"
          onSubmit={e => {
            e.preventDefault();
            setDisplayTerm(searchTerm);
          }}
        >
          <div className="inv-search-container">
            <input
              type="text"
              className="inv-search-input"
              placeholder="Buscar material..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="inv-search-icon" aria-label="Buscar">
              🔍
            </button>
          </div>
        </form>

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

        <div className="infm-form-buttons">
          <button type="button" className="infm-btn-delete">Eliminar</button>
          <button type="button" className="infm-btn-edit">Modificar</button>
          <button type="button" className="infm-btn-add" onClick={handleGuardar}>Agregar</button>
          <button type="button" className="infm-btn-back" onClick={() => navigate(-1)}>Regresar</button>
        </div>
      </motion.div>
    </div>
  );
}
