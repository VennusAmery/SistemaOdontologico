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
  });

  const [formData, setFormData] = useState({
    estado: {
      materialEquipo: false,
      agua: false,
      servicioTecnico: false,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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

  // Carga datos al montar
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    axios.get(`http://localhost:4000/api/proveedores/${id}`)
      .then(res => setProveedor(res.data))
      .catch(() => setError('No se pudo cargar el proveedor'))
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    const fetchProveedor = async () => {
      if (!id) return; // si no hay id, no estamos editando
      setLoading(true);
      try {
        const res = await axios.get(`http://localhost:4000/api/proveedores/${id}`);
        setProveedor(res.data);
      } catch (err) {
        console.error('Error al obtener proveedor:', err);
        setError('No se pudo cargar el proveedor');
      } finally {
        setLoading(false);
      }
    };

    fetchProveedor();
  }, [id]);

  const handleSave = async () => {
    try {
      if (id) {
        // Modo edición
        await axios.put(`http://localhost:4000/api/proveedores/${id}`, proveedor);
        alert('Proveedor actualizado exitosamente');
      } else {
        // Modo nuevo
        await axios.post('http://localhost:4000/api/proveedores', proveedor);
        alert('Proveedor creado exitosamente');
        setProveedor({
          nombre: '',
          ubicacion: '',
          nit: '',
          telefono: '',
          correo: '',
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


  const goTo = path => navigate(path);

  if (loading) return <div>Cargando...</div>;
  if (error) return <div>{error}</div>;

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
                <input name="nombre" value={proveedor.nombre} onChange={handleChange} />

                <label>Ubicación:</label>
                <input name="ubicacion" value={proveedor.ubicacion} onChange={handleChange} />

                <label>NIT:</label>
                <input name="nit" value={proveedor.nit} onChange={handleChange} />

                <label>Teléfono:</label>
                <input name="telefono" value={proveedor.telefono || ''} onChange={handleChange} />

                <label>Correo:</label>
                <input name="correo" value={proveedor.correo   || ''} onChange={handleChange} />
              </div>

{/* EN LUGAR de formData.estado ... */}
<fieldset className="CHECKBOXPROV-group">
  <legend>Tipo de proveedor:</legend>
  <label className="CHECKBOXPROV-label">
    <input
      type="radio"
      name="id_tipo_proveedor"
      value={1}
      checked={proveedor.id_tipo_proveedor === 1}
      onChange={handleChange}
    />
    Material y equipo
  </label>
  <label className="CHECKBOXPROV-label">
    <input
      type="radio"
      name="id_tipo_proveedor"
      value={2}
      checked={proveedor.id_tipo_proveedor === 2}
      onChange={handleChange}
    />
    Agua
  </label>
  <label className="CHECKBOXPROV-label">
    <input
      type="radio"
      name="id_tipo_proveedor"
      value={3}
      checked={proveedor.id_tipo_proveedor === 3}
      onChange={handleChange}
    />
    Servicio técnico
  </label>
</fieldset>

            </div>
          </form>
        )}

        <div className="prov-buttons">
          <button className="prov-btn regresar" onClick={() => navigate(-1)}>REGRESAR</button>
          {id && <button className="prov-btn eliminar" onClick={handleDelete}>ELIMINAR</button>}
          <button className="prov-btn guardar" onClick={handleSave}>{id ? 'ACTUALIZAR' : 'GUARDAR'}</button>
        </div>
      </motion.section>
    </div>
  );
}
