import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './infoMaterial.css';

const listmateTabs = [
  { id: 'inventario',     label: 'Listado de Material',                 path: '/inventario'     },
  { id: 'ingresoMaterial', label: 'Ingreso Material',                    path: '/ingresoMaterial' },
  { id: 'infoMaterial',    label: 'Información de material utilizado',   path: '/infoMaterial'   },
  { id: 'citaMaterial',    label: 'Material usado en cita',              path: '/citaMaterial'   },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:    0,    opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 }
};

export default function InfoMaterial() {
  const navigate = useNavigate();

  // pestaña activa
  const [listmateTabActiva, setListmateTabActiva] = useState('infoMaterial');
  const handleTabClick = tab => {
    setListmateTabActiva(tab.id);
    navigate(tab.path);
  };

  // datos del formulario
  const [listmateData, setListmateData] = useState({
    idProducto:     '',
    nombreProducto: '',
    cantidad:       '',
    fechaUso:       '',
    idCita:         '',
    clinica:        '',
    descripcion:    ''
  });
  const handleListmateChange = e => {
    const { name, value } = e.target;
    setListmateData(prev => ({ ...prev, [name]: value }));
  };

  // buscador (sin debounce para simplificar)
  const [listmateSearchTerm, setListmateSearchTerm]   = useState('');
  const [listmateDisplay,    setListmateDisplay]      = useState('');
  const datos = ['Algodón', 'Gasas', 'Guantes', 'Jeringa', 'Alcohol'];
  const filtered = datos.filter(d =>
    d.toLowerCase().includes(listmateDisplay.toLowerCase())
  );
  const agrupados = filtered.reduce((acc, item) => {
    const letra = item[0].toUpperCase();
    if (!acc[letra]) acc[letra] = [];
    acc[letra].push(item);
    return acc;
  }, {});

  // flash messages
  const [listmateMessage, setListmateMessage] = useState('');
  const listmateFlash = text => {
    setListmateMessage(text);
    setTimeout(() => setListmateMessage(''), 2000);
  };
  const handleListmateSave   = () => listmateFlash('Guardado correctamente');
  const handleListmateEdit   = () => listmateFlash('Editado correctamente');
  const handleListmateDelete = () => listmateFlash('Eliminado correctamente');

  return (
    <div className="listmate-container">
      <h2 className="listmate-title">Inventario</h2>
      <hr />

      <nav className="listmate-tabs">
        {listmateTabs.map(tab => (
          <button
            key={tab.id}
            className={`listmate-tab ${listmateTabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {listmateMessage && (
        <div className="listmate-flash-message">
          {listmateMessage}
        </div>
      )}

      <motion.div
        className="listmate-body"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >
        <form
          className="listmate-search-form"
          onSubmit={e => {
            e.preventDefault();
            setListmateDisplay(listmateSearchTerm);
          }}
        >
          <div className="listmate-search-container">
            <input
              type="text"
              className="listmate-search-input"
              placeholder="Buscar material..."
              value={listmateSearchTerm}
              onChange={e => setListmateSearchTerm(e.target.value)}
            />
            <button type="submit" className="listmate-search-icon" aria-label="Buscar">
              🔍
            </button>
          </div>
        </form>

        <div className="listmate-form-grid">
          <div className="listmate-form-col">
            <label>ID Producto:</label>
            <input
              name="idProducto"
              value={listmateData.idProducto}
              onChange={handleListmateChange}
            />
            <label>Cantidad:</label>
            <input
              name="cantidad"
              value={listmateData.cantidad}
              onChange={handleListmateChange}
            />
            <label>Fecha de Uso:</label>
            <input
              name="fechaUso"
              value={listmateData.fechaUso}
              onChange={handleListmateChange}
            />
            <label>ID Cita:</label>
            <input
              name="idCita"
              value={listmateData.idCita}
              onChange={handleListmateChange}
            />
            <label>Clínica:</label>
            <input
              name="clinica"
              value={listmateData.clinica}
              onChange={handleListmateChange}
            />
          </div>
          <div className="listmate-form-col">
            <label>Nombre Producto:</label>
            <input
              name="nombreProducto"
              value={listmateData.nombreProducto}
              onChange={handleListmateChange}
            />
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={listmateData.descripcion}
              onChange={handleListmateChange}
            />
          </div>
        </div>

        <div className="listmate-form-buttons">
          <button
            type="button"
            className="listmate-btn-delete"
            onClick={handleListmateDelete}
          >
            Eliminar
          </button>
          <button
            type="button"
            className="listmate-btn-edit"
            onClick={handleListmateEdit}
          >
            Modificar
          </button>
          <button
            type="button"
            className="listmate-btn-add"
            onClick={handleListmateSave}
          >
            Agregar
          </button>
          <button
            type="button"
            className="listmate-btn-back"
            onClick={() => navigate(-1)}
          >
            Regresar
          </button>
        </div>
      </motion.div>
    </div>
  );
}
