import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './usuario.css';
import RecortadorFoto from "./RecortadorFoto";

const Usuario = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flashMessage, setFlashMessage] = useState('');
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    username: '',
    correo: '',
    foto: null,
  });

const [mostrarRecorte, setMostrarRecorte] = useState(false);
const [imagenParaRecortar, setImagenParaRecortar] = useState(null);

  const onGuardarRecorte = (croppedBlob) => {
    setNuevoUsuario((prev) => ({ ...prev, foto: croppedBlob }));
    setPreviewFoto(URL.createObjectURL(croppedBlob));
    setMostrarRecorte(false);
  };

  // Para tabs (puedes agregar si quieres)
  const [tabActiva, setTabActiva] = useState('lista');
  const tabsUsuario = [
    { id: 'lista', label: 'Lista Usuarios' },
    { id: 'nuevo', label: 'Crear Usuario' },
  ];

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/usuarios');
        setUsuarios(res.data);
      } catch (error) {
        setFlashMessage('❌ Error al cargar usuarios');
        console.error(error);
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
    setNuevoUsuario((prev) => ({ ...prev, [name]: value }));
  };

const handleFotoChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    const fileURL = URL.createObjectURL(file);
    setImagenParaRecortar(fileURL);
    setMostrarRecorte(true);
  }
};

const [previewFoto, setPreviewFoto] = useState(null);

const handleActualizarUsuario = async () => {
  if (!usuarioSeleccionado) return showFlash('⚠️ Selecciona un usuario para actualizar');

  try {
    const formData = new FormData();
    formData.append('nombre', nuevoUsuario.nombre);
    formData.append('username', nuevoUsuario.username);
    formData.append('correo', nuevoUsuario.correo);
    formData.append('puesto', nuevoUsuario.puesto);
    if (nuevoUsuario.foto) formData.append('foto', nuevoUsuario.foto);

    const res = await axios.put(`http://localhost:4000/api/usuarios/${usuarioSeleccionado.id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setUsuarios((prev) =>
      prev.map((u) => (u.id === usuarioSeleccionado.id ? res.data : u))
    );
    setUsuarioSeleccionado(null);
    setNuevoUsuario({ nombre: '', username: '', correo: '', puesto: '', foto: null });
    setPreviewFoto(null);
    showFlash('✅ Usuario actualizado correctamente');
    setTabActiva('lista');
  } catch (error) {
    showFlash('❌ Error al actualizar usuario');
    console.error(error);
  }
};

const handleEliminarUsuario = async (id) => {
  if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;

  try {
    await axios.delete(`http://localhost:4000/api/usuarios/${id}`);

    setUsuarios((prev) => prev.filter((u) => u.id !== id));
    showFlash('✅ Usuario eliminado correctamente');
  } catch (error) {
    showFlash('❌ Error al eliminar usuario');
    console.error(error);
  }
};


const handleCrearUsuario = async () => {
  if (!nuevoUsuario.nombre || !nuevoUsuario.username || !nuevoUsuario.correo || !nuevoUsuario.puesto) {
    showFlash('⚠️ Completa todos los campos');
    return;
  }

  try {
    const formData = new FormData();
    formData.append('nombre', nuevoUsuario.nombre);
    formData.append('username', nuevoUsuario.username);
    formData.append('correo', nuevoUsuario.correo);
    formData.append('puesto', nuevoUsuario.puesto);
    if (nuevoUsuario.foto) formData.append('foto', nuevoUsuario.foto);

    const res = await axios.post('http://localhost:4000/api/usuarios', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });

    setUsuarios((prev) => [...prev, res.data]);
    setNuevoUsuario({ nombre: '', username: '', correo: '', puesto: '', foto: null });
    setPreviewFoto(null);
    showFlash('✅ Usuario creado correctamente');
    setTabActiva('lista');
  } catch (error) {
    showFlash('❌ Error al crear usuario');
    console.error(error);
  }
};


  // Animaciones framer-motion para sección
  const slideVariants = {
    initial: { x: '100%', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100%', opacity: 0 },
    transition: { duration: 0.4 },
  };

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
    transition={slideVariants.transition}
  >
    {tabActiva === 'lista' && (
      <div className="usuario-lista">
        {isLoading ? (
          <p>Cargando usuarios...</p>
        ) : usuarios.length === 0 ? (
          <p>No hay usuarios registrados</p>
        ) : (
          usuarios.map((user) => (
            <div key={user.id} className="usuario-card">
              {user.foto_url ? (
                <img src={user.foto_url} alt={`${user.nombre} foto`} className="usuario-foto" />
              ) : (
                <div className="usuario-foto-placeholder">Sin foto</div>
              )}
              <p><strong>Nombre:</strong> {user.nombre}</p>
              <p><strong>Usuario:</strong> {user.username}</p>
              <p><strong>Correo:</strong> {user.correo}</p>
              <p><strong>Puesto:</strong> {user.puesto}</p>
            </div>
          ))
        )}
      </div>
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
      src={previewFoto || "/imagenes/default-user.png"}
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
    placeholder="Nombre completo"
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


<div className="usuario-botones">  
  <button
    type="button"
    className="usuario-button actualizar"
    onClick={handleCrearUsuario} >Crear Usuario</button>

  <button
    type="button"
    className="usuario-button actualizar"
    onClick={handleActualizarUsuario} >Actualizar</button>
  
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
</div>

</form>

      </>
    )}
  </motion.section>
</>
);
};

export default Usuario;