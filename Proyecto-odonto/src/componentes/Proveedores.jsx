import React, { useState } from 'react';
import './Proveedores.css';
import { useNavigate } from "react-router-dom";

const Proveedores = () => {
  const navigate = useNavigate();
  const [supplier, setSupplier] = useState({
    nombre: '',
    ubicacion: '',
    nit: '',
    tipoProveedor: '',
    telefono: '',
    correoElectronico: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier({
      ...supplier,
      [name]: value
    });
  };

  // Manejar el guardar
  const handleSave = () => {
    setMessage("Guardado Correctamente");
    // Aquí puedes realizar la lógica de guardar si es necesario
  };

  const handleEdit = () => {
    console.log('Proveedor editado:', supplier);
  };

  // Manejar el eliminar
  const handleDeleteEvent = (eventToDelete) => {
    setEvents(events.filter(evt => evt.id !== eventToDelete.id));
    setShowEventDetail(false);
    setDeleteMessage("Eliminado correctamente");
    setTimeout(() => setDeleteMessage(""), 1000);
  };

  const handleBack = () => {
    navigate('/contactos');
  };


  

  return (
    <>
      {/* ENCABEZADO */}
      <h3>Contactos</h3>
      <hr />
      <hr />
      <div className="proveedores-header">
        <div className="proveedores-title">
          <div className="icon-circle">
            <img src="/imagenes/proveedores.png" alt="Proveedor" className="circle-image" />
          </div>
          <h3 className="titulo-proveedores">Proveedores</h3>
        </div>
      </div>

      {/* BOTON INFORMACIÓN */}
      <div className="section info-button-section">
        <button className="info-button">Información</button>
        <hr />
      </div>

      {/* SECCIÓN DE DATOS DEL PROVEEDOR */}
      <div className="section supplier-info-section">
        <form className="proveedores-form">
          <div className="row">
            <div className="column">
              <label>Nombre:</label>
              <input type="text" name="nombre" value={supplier.nombre} onChange={handleChange} />

              <label>Ubicación:</label>
              <input type="text" name="ubicacion" value={supplier.ubicacion} onChange={handleChange} />

              <label>NIT:</label>
              <input type="text" name="nit" value={supplier.nit} onChange={handleChange} />
            </div>

            <div className="column">
              <h1>Tipo de proveedor:</h1>
              <div className="radio-group">
                <label className="custom-radio">
                  <input
                    type="radio"
                    name="tipoProveedor"
                    value="Material y Equipo"
                    checked={supplier.tipoProveedor === 'Material y Equipo'}
                    onChange={handleChange}
                  />
                  <span className="radio-mark"></span>
                  Material y Equipo
                </label>

                <label className="custom-radio">
                  <input
                    type="radio"
                    name="tipoProveedor"
                    value="Agua"
                    checked={supplier.tipoProveedor === 'Agua'}
                    onChange={handleChange}
                  />
                  <span className="radio-mark"></span>
                  Agua
                </label>

                <label className="custom-radio">
                  <input
                    type="radio"
                    name="tipoProveedor"
                    value="Servicio Técnico"
                    checked={supplier.tipoProveedor === 'Servicio Técnico'}
                    onChange={handleChange}
                  />
                  <span className="radio-mark"></span>
                  Servicio Técnico
                </label>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* BOTÓN CONTACTO */}
      <div className="section contact-button-section">
        <button className="contact-button" onClick={handleBack}>Contacto</button>
        <hr />
      </div>

      {/* SECCIÓN DE INFORMACIÓN DE CONTACTO */}
      <div className="section contact-info-section">
        <form className="contact-form">
          <div className="row">
            <div className="column">
              <label>Teléfono:</label>
              <input type="text" name="telefono" value={supplier.telefono} onChange={handleChange} />
            </div>
            <div className="column">
              <label>Correo Electrónico:</label>
              <input type="email" name="correoElectronico" value={supplier.correoElectronico} onChange={handleChange} />
            </div>
          </div>
        </form>
      </div>

      {/* BOTONES DE ACCIÓN */}
      <div className="section action-buttons-section">
        <button type="button" onClick={handleSave}>GUARDAR</button>
        <button type="button" onClick={handleEdit}>EDITAR</button>
        <button onClick={() => handleDeleteEvent(selectedEvent)}>Eliminar</button>
        <button className="button" onClick={() => navigate("/contactos")}>Regresar</button>
      </div>
    </>
  );
};

export default Proveedores;
