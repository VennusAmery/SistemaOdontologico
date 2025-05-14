import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import './infoMaterial.css';

const listmateTabs = [
  { id: 'inventario',     label: 'Listado de Material',                 path: '/inventario'     },
  { id: 'ingresoMaterial', label: 'Ingreso Material',                    path: '/ingresoMaterial' },
  { id: 'infoMaterial',    label: 'Información de material utilizado',   path: '/InfoMaterial'   },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:    0,    opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 }
};

export default function InfoMaterial() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [listmateTabActiva, setListmateTabActiva] = useState('infoMaterial');
  const handleTabClick = tab => {
  setListmateTabActiva(tab.id);
  navigate(tab.path);
};

  const [listmateData, setListmateData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`http://localhost:4000/api/infomaterial/${id}`)
      .then(r => r.json())
      .then(data => {
        setListmateData({
          idProducto: data.id_producto,
          nombreProducto: data.nombre,
          cantidad: data.cantidad,
          ingreso: data.ingreso?.split('T')[0] || '',
          vencimiento: data.vencimiento?.split('T')[0] || '',
          descripcion: data.descripcion,
          monto: data.monto,
          estado_disponible: data.estado_disponible,
          estado_agotado: data.estado_agotado,
          estado_solicitado: data.estado_solicitado,
          estado_pocas_unidades: data.estado_pocas_unidades
        });
      })
      .catch(err => console.error('Error al cargar material:', err));
  }, [id]);

  const handleListmateChange = e => {
    const { name, value, type, checked } = e.target;
    setListmateData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const [listmateMessage, setListmateMessage] = useState('');
  const listmateFlash = text => {
    setListmateMessage(text);
    setTimeout(() => setListmateMessage(''), 2000);
  };

  const handleListmateSave = async () => {
    try {
      await fetch(`http://localhost:4000/api/infomaterial/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: listmateData.nombreProducto,
          cantidad: listmateData.cantidad,
          ingreso: listmateData.ingreso,
          vencimiento: listmateData.vencimiento,
          descripcion: listmateData.descripcion,
          monto: listmateData.monto,
          estado_disponible: listmateData.estado_disponible,
          estado_agotado: listmateData.estado_agotado,
          estado_solicitado: listmateData.estado_solicitado,
          estado_pocas_unidades: listmateData.estado_pocas_unidades
        })
      });
      listmateFlash('Guardado correctamente');
    } catch {
      listmateFlash('Error al guardar');
    }
  };

  const handleListmateDelete = async () => {
    if (!window.confirm('¿Eliminar este material?')) return;
    try {
      await fetch(`http://localhost:4000/api/infomaterial/${id}`, {
        method: 'DELETE'
      });
      listmateFlash('Eliminado correctamente');
      navigate('/inventario');
    } catch {
      listmateFlash('Error al eliminar');
    }
  };

  if (!listmateData) return <div>Cargando...</div>;




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
        <div className="listmate-form-grid">
          <div className="listmate-form-col">
            <label>Producto:</label>
            <input
              name="nombreProducto"
              value={listmateData.nombreProducto}
              onChange={handleListmateChange}
            />
            <label>Cantidad:</label>
            <input
              name="cantidad"
              type="number"
              value={listmateData.cantidad}
              onChange={handleListmateChange}
            />
            <label>Ingreso:</label>
            <input
              name="ingreso"
              type="date"
              value={listmateData.ingreso}
              onChange={handleListmateChange}
            />
            <label>Vencimiento:</label>
            <input
              name="vencimiento"
              type="date"
              value={listmateData.vencimiento}
              onChange={handleListmateChange}
            />
            <label>Monto:</label>
            <input
              name="monto"
              type="number"
              step="0.01"
              value={listmateData.monto}
              onChange={handleListmateChange}
            />
          </div>
          <div className="listmate-form-col">
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={listmateData.descripcion}
              onChange={handleListmateChange}
            />
            <fieldset className="listmate-states">
              <label>
                <input
                  name="estado_disponible"
                  type="checkbox"
                  checked={listmateData.estado_disponible}
                  onChange={handleListmateChange}
                /> Disponible
              </label>
              <label>
                <input
                  name="estado_agotado"
                  type="checkbox"
                  checked={listmateData.estado_agotado}
                  onChange={handleListmateChange}
                /> Agotado
              </label>
              <label>
                <input
                  name="estado_solicitado"
                  type="checkbox"
                  checked={listmateData.estado_solicitado}
                  onChange={handleListmateChange}
                /> Solicitado
              </label>
              <label>
                <input
                  name="estado_pocas_unidades"
                  type="checkbox"
                  checked={listmateData.estado_pocas_unidades}
                  onChange={handleListmateChange}
                /> Pocas Unidades
              </label>
            </fieldset>
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
            onClick={handleListmateSave}
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