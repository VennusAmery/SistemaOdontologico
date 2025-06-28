import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './usuario.css';
import RecortadorFoto from "./RecortadorFoto";

const Usuario = () => {
  const navigate = useNavigate();
  // State hooks
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState({
    usuario: '',
    correo: '',
    foto: null,
  });
  const [previewFoto, setPreviewFoto] = useState(null);

  // Image cropper
  const [mostrarRecorte, setMostrarRecorte] = useState(false);
  const [imagenParaRecortar, setImagenParaRecortar] = useState(null);

  // Tabs
  const [tabActiva, setTabActiva] = useState('lista');
  const tabsUsuario = [
    { id: 'lista', label: 'Lista Usuarios' },
    { id: 'nuevo', label: 'Crear Usuario' },
  ];

  const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

  // Fetch usuarios
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/usuarios');
        setUsuarios(res.data);
      } catch (error) {
        console.error(error);
        setFlashMessage('❌ Error al cargar usuarios');
      } finally {
        setIsLoading(false);
      }
    };
    fetchUsuarios();
  }, []);

  const showFlash = (msg) => {
    setFlashMessage(msg);
    setTimeout(() => setFlashMessage(''), 3000);
  };

  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    setFlashMessage('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario(prev => ({ ...prev, [name]: value }));
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagenParaRecortar(url);
      setMostrarRecorte(true);
    }
  };

  const onGuardarRecorte = (croppedBlob) => {
    setNuevoUsuario(prev => ({ ...prev, foto: croppedBlob }));
    setPreviewFoto(URL.createObjectURL(croppedBlob));
    setMostrarRecorte(false);
  };

  // Create user
  const handleCrearUsuario = async () => {
    if (!nuevoUsuario.usuario || !nuevoUsuario.correo) {
      return showFlash('⚠️ Completa todos los campos');
    }
    try {
      const formData = new FormData();
      formData.append('usuario', nuevoUsuario.usuario);
      formData.append('correo', nuevoUsuario.correo);
      if (nuevoUsuario.foto) formData.append('foto', nuevoUsuario.foto);

      const res = await axios.post('http://localhost:4000/api/usuarios', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setUsuarios(prev => [...prev, res.data]);
      setNuevoUsuario({ usuario: '', correo: '', foto: null });
      setPreviewFoto(null);
      showFlash('✅ Usuario creado correctamente');
      setTabActiva('lista');
    } catch (error) {
      console.error(error);
      showFlash('❌ Error al crear usuario');
    }
  };

  // Delete user
  const handleEliminarUsuario = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await axios.delete(`http://localhost:4000/api/usuarios/${id}`);
      setUsuarios(prev => prev.filter(u => u.id !== id));
      showFlash('✅ Usuario eliminado correctamente');
    } catch (error) {
      console.error(error);
      showFlash('❌ Error al eliminar usuario');
    }
  };

  // Filter + group
  const [searchTerm, setSearchTerm] = useState('');
  const [displayTerm, setDisplayTerm] = useState('');
  useEffect(() => {
    const t = setTimeout(() => setDisplayTerm(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  const filtered = useMemo(
    () => usuarios.filter(u => (u.usuario || '').toLowerCase().includes(displayTerm.toLowerCase())),
    [usuarios, displayTerm]
  );

  const agrupados = useMemo(() => {
    const obj = {};
    filtered.forEach(u => {
      const key = (u.usuario || 'A').charAt(0).toUpperCase();
      if (!obj[key]) obj[key] = [];
      obj[key].push(u);
    });
    return obj;
  }, [filtered]);

 return (
  <>
    <div className="usuario-header">
      <div className="usuario-container">
        <h2 className="usuario-title">Usuarios</h2>
        <hr />
        <nav className="usuario-tabs">
          {tabsUsuario.map(tab => (
            <button
              key={tab.id}
              type="button"
              className={`usuario-tab ${tabActiva === tab.id ? 'active' : ''}`}
              onClick={() => handleTabClick(tab)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
    </div>
  </div>

  {flashMessage && <div className="usuario-flash-message">{flashMessage}</div>}

    <motion.section
        className="usuario-motion-section"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition} >
      
        {tabActiva === 'lista' && (
          <>
                  {/* ——— Buscador ——— */}
                <form
                        className="usuario-search-form"
                        onSubmit={e => { e.preventDefault(); setDisplayTerm(searchTerm); }}>
                        <div className="usuario-search-container">
                            <input
                            type="text"
                            className="usuario-search-input"
                            placeholder="Buscar usuario..."
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)} />
                            <button type="submit" className="usuario-search-icon" aria-label="Buscar">🔍</button>
                        </div>
                        </form>

        {/* ——— Resultados ——— */}
        <div className="usuario-search-results">
          {Object.keys(agrupados).length > 0 ? (
            Object.keys(agrupados).sort().map(letra => (
              <div key={letra}>
                <div className="usuario-letter-separator">{letra}</div>
                {agrupados[letra].map(mat => (
                  <div
                    key={mat.id}
                    className="usuario-search-item"
                    role="button"
                    tabIndex={0}
                    onClick={() => navigate(`/usuarioinfo/${mat.id}`)}
                    onKeyDown={e => e.key === 'Enter' && navigate(`/usuarioinfo/${mat.id}`)}>
                    {mat.usuario}
                  </div>
                ))}
              </div>
            ))
          ) : (
            <div className="usuario-search-noresults">No se encontraron materiales</div>
          )}
        </div>
                  {/* Botones de acción */}
            <div className="usuario-form-buttons">
            <button type="button" className="usuario-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
            </div>
          </>
        )}

    {tabActiva === 'nuevo' && (
      <>
        <div className="usuario-container2">
          <div className="usuario-circle">
            <img
              src="/imagenes/Trabajador.png"
              alt="Trabajador"
              className="usuario-image"
            />
          </div>
          <div className="usuario-text">
            <h2 className="usuario-title">Gestión de Usuarios</h2>
          </div>
        </div>
        <hr className="hringreso" />


{mostrarRecorte && (
  <RecortadorFoto
    imagen={imagenParaRecortar}
    onCancel={() => setMostrarRecorte(false)}
    onGuardar={(croppedImgUrl) => {
      setPreviewFoto(croppedImgUrl);
      fetch(croppedImgUrl)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], 'perfil.png', { type: 'image/png' });
          setNuevoUsuario(prev => ({ ...prev, foto: file }));
        });
      setMostrarRecorte(false);
    }}
  />
)}

 <form
  className="usuario-form"
  onSubmit={(e) => {
    e.preventDefault();
    handleCrearUsuario();
  }}
>
<div className="usuario-foto-contenedor">
  <div className="usuario-foto-wrapper">
    <img
      src={previewFoto || "/imagenes/avatar-de-usuario-gris.png"}
      alt="Foto de perfil"
      className="usuario-foto-circular"
    />
    <label htmlFor="foto" className="usuario-foto-overlay">
      <i className="fas fa-edit"></i>
    </label>
  </div>
  <input
    type="file"
    accept="image/*"
    id="foto"
    onChange={handleFotoChange}
    className="usuario-input-file"
  />
  <p className="usuario-nombre-preview">{nuevoUsuario.username || 'Nuevo Usuario'}</p>
</div>

  <input
    type="text"
    name="nombre"
    placeholder="Nombre"
    value={nuevoUsuario.nombre}
    onChange={handleInputChange}
    className="usuario-input"
  />
  <input
    type="text"
    name="username"
    placeholder="Nombre de usuario"
    value={nuevoUsuario.username}
    onChange={handleInputChange}
    className="usuario-input"
  />
  <input
    type="email"
    name="correo"
    placeholder="Correo electrónico"
    value={nuevoUsuario.correo}
    onChange={handleInputChange}
    className="usuario-input"
  />

<div>
  <button
    type="button"
    className="usuario-button crear"
    onClick={() => {
      if (usuarioSeleccionado) {
        handleCrearUsuario(usuarioSeleccionado.id);
      } else {
        showFlash("⚠️ Selecciona un usuario para eliminar");
      }
    }}>CREAR </button>

  <button
    type="button"
    className="usuario-button eliminar"
    onClick={() => {
      if (usuarioSeleccionado) {
        handleEliminarUsuario(usuarioSeleccionado.id);
      } else {
        showFlash("⚠️ Selecciona un usuario para eliminar");
      }
    }}>Eliminar </button>

  <button
    type="button"
    className="usuario-button actualizar"
    onClick={() => {
      if (usuarioSeleccionado) {
        handleEliminarUsuario(usuarioSeleccionado.id);
      } else {
        showFlash("Usuario actualizado correctamente");
      }
    }}>ACTUALIZAR </button>

</div>
</form>

      </>

    )}
  </motion.section>
</>
);
};

export default Usuario;