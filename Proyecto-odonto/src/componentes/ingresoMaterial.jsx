import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ingresoMaterial.css';

const IngresoMaterial = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nombre: '',
    cantidad: 1,
    descripcion: '',
    ubicacion: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'cantidad' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría el envío a la API
    console.log('Nuevo material ingresado:', formData);
    setSubmitted(true);
  };

  return (
    <div className="ingreso-container">
      <header className="ingreso-header">
        <button className="back-btn" onClick={() => navigate(-1)}>Volver</button>
        <h1>Ingreso de Material</h1>
      </header>

      {!submitted ? (
        <form className="ingreso-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
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
            <label>Descripción:</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Ubicación:</label>
            <input
              type="text"
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">Guardar</button>
        </form>
      ) : (
        <div className="submit-success">
          <h2>Material ingresado correctamente</h2>
          <button onClick={() => navigate('/inventario')}>Ir a Inventario</button>
          <button onClick={() => setSubmitted(false)}>Ingresar otro</button>
        </div>
      )}
    </div>
  );
};

export default IngresoMaterial;