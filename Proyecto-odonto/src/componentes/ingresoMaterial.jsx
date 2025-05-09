import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ingresoMaterial.css';
import { motion } from 'framer-motion';

const tabConfig = [
  { id: 'inventario',     label: 'Listado de Material',             path: '/inventario'     },
  { id: 'ingresoMaterial', label: 'Ingreso Material',                path: '/ingresoMaterial' },
  { id: 'infoMaterial',    label: 'Información de material utilizado', path: '/infoMaterial'   },
  { id: 'citaMaterial',    label: 'Material usado en cita',          path: '/citaMaterial'   },
];

const slideVariants = {
  initial:   { x: '100%',  opacity: 0 },
  animate:   { x: 0,       opacity: 1 },
  exit:      { x: '-100%', opacity: 0 },
  transition:{ duration: 0.4 }
};

export default function IngresoMaterial() {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState('ingresoMaterial');
  const [message, setMessage]       = useState('');

  const [formData, setFormData] = useState({
    id: '',
    nombre: '',
    cantidad: 1,
    fechaEntrega: '',
    fechaSalida: '',
    proveedor: '',
    vencimiento: '',
    clinica: '',
    precio: '',
    descripcion: '',
    estado: {
      disponible: false,
      agotado: false,
      solicitado: false,
      pocasUnidades: false
    }
  });
  const [submitted, setSubmitted] = useState(false);

  const handleTabClick = tab => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (name in formData.estado) {
      setFormData(prev => ({
        ...prev,
        estado: { ...prev.estado, [name]: checked }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'number' ? parseFloat(value) : value
      }));
    }
  };

  // dispara el flash message y lo limpia a los 2s
  const flashMessage = text => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleSave   = () => flashMessage('Guardado correctamente');
  const handleEdit   = () => flashMessage('Editado correctamente');
  const handleDelete = () => flashMessage('Eliminado correctamente');

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Nuevo material ingresado:', formData);
    setSubmitted(true);
    flashMessage('Guardado correctamente');
  };

  const handleBack = () => navigate(-1);

  return (
    <div className="inv-container">
      <h2 className="inv-title">Inventario</h2>
      <hr />

      {/* Tabs */}
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

      {/* Flash message */}
      {message && (
        <div className="flash-message">
          {message}
        </div>
      )}

      {/* Contenido con animación */}
      <motion.div
        className="ingreso-body"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >
        <form className="ingreso-form" onSubmit={handleSubmit}>
          <div className="col-left">
            <div className="form-group">
              <label>ID Producto:</label>
              <input name="id" value={formData.id} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Cantidad:</label>
              <input
                type="number"
                name="cantidad"
                value={formData.cantidad}
                onChange={handleChange}
                min="1"
                required
              />
            </div>
            <div className="form-group">
              <label>Fecha Entrega:</label>
              <input
                type="date"
                name="fechaEntrega"
                value={formData.fechaEntrega}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Fecha Salida:</label>
              <input
                type="date"
                name="fechaSalida"
                value={formData.fechaSalida}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Proveedor:</label>
              <input name="proveedor" value={formData.proveedor} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Vencimiento:</label>
              <input
                type="date"
                name="vencimiento"
                value={formData.vencimiento}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Clínica:</label>
              <input name="clinica" value={formData.clinica} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Precio:</label>
              <input
                type="number"
                name="precio"
                value={formData.precio}
                onChange={handleChange}
                step="0.01"
              />
            </div>
          </div>

          <div className="col-right">
            <div className="form-group">
              <label>Nombre Producto:</label>
              <input name="nombre" value={formData.nombre} onChange={handleChange} required />
            </div>

            <fieldset className="estado-group">
              <legend>Estado</legend>
              {Object.keys(formData.estado).map(key => (
                <label key={key} className="checkbox-label">
                  <input
                    type="checkbox"
                    name={key}
                    checked={formData.estado[key]}
                    onChange={handleChange}
                  />
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
              ))}
            </fieldset>

            <div className="form-group descripcion-group">
              <label>Descripción:</label>
              <textarea
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* Botones de acción */}
          <div className="ingM-form-buttons">
            <button
              type="button"
              className="ingM-btn-back"
              onClick={handleBack}
            >
              REGRESAR
            </button>
            <button
              type="button"
              className="ingM-btn-delete"
              onClick={handleDelete}
            >
              ELIMINAR
            </button>
            <button
              type="button"
              className="ingM-btn-edit"
              onClick={handleEdit}
            >
              EDITAR
            </button>
            <button
              type="submit"
              className="ingM-btn-add"
              onClick={handleSave}
            >
              GUARDAR
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
