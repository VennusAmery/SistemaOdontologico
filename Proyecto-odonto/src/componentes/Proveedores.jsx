import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import './Proveedores.css';

export default function Proveedores() {
  const navigate = useNavigate();
  const location = useLocation();

  const tabsEncabezado = [
    { id: 'listadoProveedores', label: 'Listado de Proveedores', path: '/listadoProveedores' },
    { id: 'ingresoProveedores', label: 'Ingreso de Proveedores', path: '/Proveedores' },
  ];

  const [activeEncabezado, setActiveEncabezado] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('info');

  const [supplier, setSupplier] = useState({
    nombre: '',
    ubicacion: '',
    nit: '',
    telefono: '',
    correoElectronico: '',
  });

  const [formData, setFormData] = useState({
    estado: {
      materialEquipo: false,
      agua: false,
      servicioTecnico: false,
    },
  });

  const [message, setMessage] = useState('');

  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 },
  };

  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    if (name in formData.estado) {
      setFormData(prev => ({
        ...prev,
        estado: {
          ...prev.estado,
          [name]: checked,
        },
      }));
    } else {
      setSupplier(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  /*DATOS QUE TLEFONOS Y <CORREOS></CORREOS*/
  const [phoneList] = useState([
  '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
    '555-1234',
  '555-5678',
  '555-8765',
]);

const [emailList] = useState([
  'juan@example.com',
  'maria@example.com',
  'sofia@example.com',
]);


  useEffect(() => {
    const cur = tabsEncabezado.find(tab => tab.path === location.pathname);
    if (cur) setActiveEncabezado(cur.id);
  }, [location.pathname]);

  const flashMessage = text => {
    setMessage(text);
    setTimeout(() => setMessage(''), 2000);
  };

  const handleSave = () => flashMessage('💾 Guardado correctamente');
  const handleEdit = () => flashMessage('🖋️ Editado correctamente');
  const handleDelete = () => { flashMessage('🗑️ Eliminado correctamente');};

  const goTo = path => navigate(path);

  return (
    <div className="prov-container">
      <h2 className="prov-title">Contactos</h2>
      <hr className="prov-hr" />

      <nav className="prov-tabs">
        {tabsEncabezado.map(tab => (
          <button
            key={tab.id}
            className={`prov-tab ${activeEncabezado === tab.id ? 'active' : ''}`}
            onClick={() => goTo(tab.path)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="prov-content"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <div className="prov-container2">
          <div className="prov-circle">
            <img src="/imagenes/proveedores.png" alt="Proveedor" className="prov-image" />
          </div>
          <div className="prov-text">
            <h2 className="prov-header-title">Gestión de Proveedores</h2>
          </div>
        </div>
        <hr className="prov-separator" />

        {message && (
          <div className="custom-toast">
            <div className="custom-toast-content">{message}</div>
          </div>
        )}

        {activeSubTab === 'info' && (
          <form className="prov-form">
            <div className="prov-row">
              <div className="prov-column">
                <label>Nombre:</label>
                <input name="nombre" value={supplier.nombre} onChange={handleChange} />

                <label>Ubicación:</label>
                <input name="ubicacion" value={supplier.ubicacion} onChange={handleChange} />

                <label>NIT:</label>
                <input name="nit" value={supplier.nit} onChange={handleChange} />
             
                    <label>Teléfono:</label>
                    <select
                      name="telefono"
                      value={supplier.telefono}
                      onChange={handleChange}
                    >
                      <option value="">— Seleccione —</option>
                      {phoneList.map(num => (
                        <option key={num} value={num}>{num}</option>
                      ))}
                    </select>

                    <label>Correo:</label>
                    <select
                      name="correoElectronico"
                      value={supplier.correoElectronico}
                      onChange={handleChange}
                    >
                      <option value="">— Seleccione —</option>
                      {emailList.map(email => (
                        <option key={email} value={email}>{email}</option>
                      ))}
                    </select>
                  </div>

              <fieldset className="CHECKBOXPROV-group">
                <legend>Tipo de proveedor:</legend>
                {Object.keys(formData.estado).map(key => (
                  <label key={key} className="CHECKBOXPROV-label">
                    <input
                      type="checkbox"
                      name={key}
                      checked={formData.estado[key]}
                      onChange={handleChange}
                    />
                    {key === 'materialEquipo'
                      ? 'Material y equipo'
                      : key === 'agua'
                      ? 'Agua'
                      : key === 'servicioTecnico'
                      ? 'Servicio técnico'
                      : key}
                  </label>
                ))}
              </fieldset>

            </div>
          </form>
        )}

        <div className="prov-buttons">
          <button className="prov-btn regresar" onClick={() => navigate(-1)}>REGRESAR</button>
          <button className="prov-btn eliminar" onClick={handleDelete}>ELIMINAR</button>
          <button className="prov-btn editar" onClick={handleEdit}>EDITAR</button>
          <button className="prov-btn guardar" onClick={handleSave}>GUARDAR</button>
        </div>
      </motion.section>
    </div>
  );
}
