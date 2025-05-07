import React, { useState } from 'react';
import './Proveedores.css';
import { useNavigate } from 'react-router-dom';

export default function Proveedores() {
  const navigate = useNavigate();

  const tabsProveedores = [
    { id: 'info', label: 'Información', path: '/' },
  ];

  const tabsProveedores2 = [
    { id: 'info', label: 'Contacto', path: '/' },
  ];


  const [activeTab, setActiveTab] = useState(tabsProveedores[0].id);
  const [supplier, setSupplier] = useState({
    nombre: '',
    ubicacion: '',
    nit: '',
    tipoProveedor: '',
    telefono: '',
    correoElectronico: '',
  });
  const [message, setMessage] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab.id);
    navigate(tab.path);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSupplier(prev => ({ ...prev, [name]: value }));
  };

  const flashMessage = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleSave = () => flashMessage('Guardado Correctamente');
  const handleEdit = () => {
    console.log('Proveedor editado:', supplier);
    flashMessage('Editado Correctamente');
  };
  const handleDelete = () => {
    setSupplier({ nombre: '', ubicacion: '', nit: '', tipoProveedor: '', telefono: '', correoElectronico: '' });
    flashMessage('Eliminado Correctamente');
  };

  return (
    <div className="prov-container">
      <h2>Contactos</h2>
      <hr />
      <div className="prov-container2">
        <div className="prov-circle">
          <img src="/imagenes/proveedores.png" alt="Proveedor" className="prov-image" />
        </div>
        <div className="prov-text">
          <h2 className="prov-title">Proveedores</h2>
        </div>
      </div>
      <hr className="prov-separator" />


      {/* Tabs */}
      <nav className="provf-tabs" aria-label="Secciones de Inventario">
        {tabsProveedores.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`provf-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)} >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* Flash message */}
              {message && (
          <div className="custom-toast">
            <div className="custom-toast-content">
              {message}
            </div>
          </div>
        )}

      {/* Información proveedor */}
      {activeTab === 'info' && (
        <>
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
                  <label>Tipo de proveedor:</label>
                  <div className="radio-group">
                    {['Material y Equipo', 'Agua', 'Servicio Técnico'].map(type => (
                      <label key={type} className="custom-radio">
                        <input
                          type="radio"
                          name="tipoProveedor"
                          value={type}
                          checked={supplier.tipoProveedor === type}
                          onChange={handleChange}/>
                        <span className="radio-mark" /> {type}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </form>
          </div>

          {/* Información contacto */}
          <div className="section contact-info-section">
            <nav className="provf-tabs" aria-label="Secciones de Inventario">
              {tabsProveedores2.map(tab => (
                <button
                  key={tab.id}
                  type="button"
                  className={`provf-tab ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => handleTabClick(tab)} >
                  {tab.label}
                </button>
              ))}
            </nav>
            </div>

            <form className="contact-form">
              <div className="row">
                <div className="column">
                  <label>Teléfono:</label>
                  <input
                    type="text"
                    name="telefono"
                    value={supplier.telefono}
                    onChange={handleChange}
                  />
                </div>
                <div className="column">
                  <label>Correo Electrónico:</label>
                  <input
                    type="email"
                    name="correoElectronico"
                    value={supplier.correoElectronico}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </form>

            {/* Botones de acción */}
            <div className="action-buttons-section">
              <button type="button" onClick={handleSave}>GUARDAR</button>
              <button type="button" onClick={handleEdit}>EDITAR</button>
              <button type="button" onClick={handleDelete}>ELIMINAR</button>
              <button type="button" className="prov-btn-back" onClick={() => navigate('/listadoProveedores')}>REGRESAR</button>
              </div>
 
        </>
      )}
    </div>
  );
}
