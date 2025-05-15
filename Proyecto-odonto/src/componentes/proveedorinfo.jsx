import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import './Proveedores.css';
import axios from 'axios';

export default function Proveedorinfo() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const tabsEncabezado = [
    { id: 'listadoProveedores', label: 'Listado de Proveedores', path: '/listadoProveedores' },
    { id: 'ingresoProveedores', label: 'Ingreso de Proveedores', path: '/proveedores' },
  ];

  const [activeEncabezado, setActiveEncabezado] = useState('');
  const [activeSubTab, setActiveSubTab] = useState('info');
  const [proveedor, setProveedor] = useState({
    nombre: '',
    ubicacion: '',
    nit: '',
    telefono: '',
    correo: '',
    id_tipo_proveedor: null,
    tipo_proveedor: '',
    contactos: [],
  });

  const [newContacto, setNewContacto] = useState({ telefono: '', correo: '' });
  const [selectedPhoneIdx, setSelectedPhoneIdx] = useState('0');
  const [selectedEmailIdx, setSelectedEmailIdx] = useState('0');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [contactos, setContactos] = useState([]);


  const [formData, setFormData] = useState({
    estado: {
      materialEquipo: false,
      agua: false,
      servicioTecnico: false,
    },
  });

  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 },
  };

  // Maneja cambios en inputs
  const handleChange = e => {
    const { name, value } = e.target;
    setProveedor(prev => ({
      ...prev,
      [name]: name === 'id_tipo_proveedor' ? parseInt(value, 10) : value
    }));
  };

useEffect(() => {
  if (!id) return;
  setLoading(true);
  axios.get(`http://localhost:4000/api/proveedores/${id}`)
    .then(res => {
      const data = res.data;
      const contactosInit = [];
      if (data.telefono || data.correo) {
        contactosInit.push({ telefono: data.telefono || '', correo: data.correo || '' });
      }
      if (Array.isArray(data.contactos)) {
        data.contactos.forEach(c => {
          if (!(c.telefono === data.telefono && c.correo === data.correo)) {
            contactosInit.push(c);
          }
        });
      }
setProveedor({
  id_proveedor: data.id_proveedor || Number(id), // asegúrate que sea número
  nombre: data.nombre || '',
  ubicacion: data.ubicacion || '',
  nit: data.nit || '',
  id_tipo_proveedor: data.id_tipo_proveedor || null,
  contactos: contactosInit,
});


    })
    .catch(() => setError('No se pudo cargar el proveedor'))
    .finally(() => setLoading(false));
}, [id]);


const handleSave = async () => {
  try {
    const telefonoPrincipal = proveedor.contactos[0]?.telefono || '';
    const correoPrincipal = proveedor.contactos[0]?.correo || '';

const dataToSend = {
  nombre: proveedor.nombre,
  ubicacion: proveedor.ubicacion,
  nit: proveedor.nit,
  id_tipo_proveedor: proveedor.id_tipo_proveedor,
  contactos: proveedor.contactos, 
  id_proveedor: proveedor.id_proveedor, 
  telefono: proveedor.telefono  || null,
  correo: proveedor.correo || null
};

    if (id) {
      await axios.put(`http://localhost:4000/api/proveedores/${id}`, dataToSend);
      alert('Proveedor actualizado exitosamente');
    } else {
      await axios.post('http://localhost:4000/api/proveedores', dataToSend);
      alert('Proveedor creado exitosamente');
      setProveedor({
        nombre: '',
        ubicacion: '',
        nit: '',
        contactos: [],
      });
    }
    navigate('/listadoProveedores');
  } catch (err) {
    console.error('Error al guardar proveedor:', err);
    alert('Hubo un error al guardar');
  }
};


 const handleDelete = async () => {
  if (!id) return;
  if (!window.confirm('¿Seguro que deseas eliminar este proveedor?')) return;
  try {
    await axios.delete(`http://localhost:4000/api/proveedores/${id}`);
    alert('Proveedor eliminado');
    // redirige al listado
    navigate('/listadoProveedores');
  } catch (err) {
    console.error('Error al eliminar proveedor:', err);
    alert('Hubo un error al eliminar');
  }
};

const handleContactoChange = (idx, field, value) => {
  setProveedor(prev => {
    const contactos = [...prev.contactos];
    contactos[idx] = { ...contactos[idx], [field]: value };
    return { ...prev, contactos };
  });
};

  const handleNewContactoChange = (e) => {
    const { name, value } = e.target;
    setNewContacto(prevState => ({ ...prevState, [name]: value }));
  };



const addContacto = async () => {
  const { telefono, correo } = newContacto;

  if (!telefono && !correo) {
    alert("Ingrese al menos un teléfono o un correo");
    return;
  }

  try {
    await axios.post("http://localhost:4000/api/proveedorinfo", {
      id_proveedor: proveedor.id_proveedor,
      telefono: telefono || null,
      correo: correo || null
    });

    alert("Contacto agregado correctamente");

    // Actualiza la vista local
    setProveedor(prev => ({
      ...prev,
      contactos: [...prev.contactos, { telefono, correo }]
    }));

    // Limpia los inputs
    setNewContacto({ telefono: '', correo: '' });
  } catch (err) {
    console.error("Error al agregar contacto:", err);
    alert(err.response?.data?.error || "Error al agregar contacto");
  }
};

const addProveedor = async () => {
  const dataToSend = {
    nombre: 'Nombre del proveedor', // Agrega estos valores según tu necesidad
    ubicacion: 'Ubicación del proveedor',
    nit: 'NIT del proveedor',
    id_tipo_proveedor: 1, // Cambia este valor si es necesario
    contactos: [
      {
        telefono: newContacto.telefono,
        correo: newContacto.correo || null,  // Si no hay correo, se envía como null
      }
    ],
  };

  try {
    // Crear el proveedor primero
    const response = await axios.post('http://localhost:4000/api/proveedores', dataToSend);
    
    if (response.status === 201) {
      const proveedorId = response.data.id;  // Obtén el id del proveedor creado

      // Ahora agrega los contactos asociados al proveedor
      const contactosToAdd = {
        id_proveedor: proveedorId,  // Asocia los contactos con el id del proveedor
        contactos: [
          {
            telefono: newContacto.telefono,
            correo: newContacto.correo || null,
          }
        ]
      };

      // Aquí puedes hacer otro POST para agregar los contactos
      const contactosResponse = await axios.post('http://localhost:4000/api/proveedores', contactosToAdd);
      
      if (contactosResponse.status === 201) {
        alert('Contacto agregado correctamente');
        setNewContacto({ telefono: '', correo: '' });  // Limpiar los campos
      } else {
        alert('Error al agregar los contactos');
      }
    }
  } catch (error) {
    console.error('Contacto agregado correctamente', error);
    alert('Contacto agregado correctamente');
  }
};

  const goTo = path => navigate(path);

 
  if (loading) return <div className="cargando">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  const phoneOptions = proveedor.contactos.map((c, i) => (
    <option key={i} value={i}>{c.telefono || 'Sin teléfono'}</option>
  ));
  const emailOptions = proveedor.contactos.map((c, i) => (
    <option key={i} value={i}>{c.correo || 'Sin correo'}</option>
  ));

  const selectedPhoneContacto = proveedor.contactos[Number(selectedPhoneIdx)];
  const selectedEmailContacto = proveedor.contactos[Number(selectedEmailIdx)];

  return (
    <div className="prov-container">
      <h2 className="prov-title">Contactos</h2>
      <hr className="prov-hr" />

      <nav className="prov-tabs">
        {tabsEncabezado.map(tab => (
          <button
            key={tab.id}
            className={`prov-tab ${activeEncabezado === tab.id ? 'active' : ''}`}
            onClick={() => navigate(tab.path)}
          >{tab.label}</button>
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
                <input name="nombre" value={proveedor.nombre} onChange={handleChange} />

                <label>Ubicación:</label>
                <input name="ubicacion" value={proveedor.ubicacion} onChange={handleChange} />

                <label>NIT:</label>
                <input name="nit" value={proveedor.nit} onChange={handleChange} />


{/* Teléfonos */}
<label>Teléfonos:</label>
<div className="select-input-wrapper">

  {selectedPhoneIdx === 'new' ? (
    <input
      type="text"
      name="telefono"
      placeholder="Nuevo teléfono"
      value={proveedor.telefono}
      onChange={handleNewContactoChange}
    />
  ) : (
    <input
      type="text"
      value={proveedor.contactos[selectedPhoneIdx]?.telefono || ''}
      onChange={e => handleContactoChange(Number(selectedPhoneIdx), 'telefono', e.target.value)}
    />
  )}
</div>

{/* Correos */}
<label>Correos:</label>
<div className="select-input-wrapper">

  {selectedEmailIdx === 'new' ? (
    <input
      type="email"
      name="correo"
      placeholder="Nuevo correo"
      value={proveedor.correo}
      onChange={handleNewContactoChange}
    />
  ) : (
    <input
      type="email"
      value={proveedor.contactos[selectedEmailIdx]?.correo || ''}
      onChange={e => handleContactoChange(Number(selectedEmailIdx), 'correo', e.target.value)}
    />
  )}
</div>

                </div>

                      {/* Columna para los radio buttons */}
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
          {id && <button className="prov-btn eliminar" onClick={handleDelete}>ELIMINAR</button>}
        <button type="button" className="prov-btn agregar-contacto" onClick={addContacto }> Agregar contacto</button>
          <button className="prov-btn guardar" onClick={handleSave}>{id ? 'ACTUALIZAR' : 'GUARDAR'}</button>
        </div>

      </motion.section>
    </div>
  );
}