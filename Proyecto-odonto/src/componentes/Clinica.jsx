import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './clinica.css';

const tabConfig = [
  { id: 'clinica14', label: 'Clínica Zona 14', path: '/clinicaZona14' },
  { id: 'clinicaJalapa', label: 'Clínica Jalapa', path: '/clinicaJalapa' },
];

const slideVariants = {
  initial:    { x: '100%',  opacity: 0 },
  animate:    { x:   0,     opacity: 1 },
  exit:       { x: '-100%', opacity: 0 },
  transition: { duration: 0.4 },
};

const Clinica = () => {
  const navigate = useNavigate();
  const [tabActiva, setTabActiva] = useState(tabConfig[0].id);
  const [modoEdicion, setModoEdicion] = useState(false); 
  const [formData, setFormData] = useState({
    nombre: 'Clínica Zona 14',
    ubicacion: 'Ciudad de Guatemala',
    correo: 'optimadental@clinica.gt',
    telefono: '2222-3333',
    apertura: '08:00',
    cierre: '17:00',
  });  

useEffect(() => {
  const fetchClinica = async () => {
    try {
      const clinicaId = tabActiva === 'clinica14' ? 2 : 3; // Aquí defines el ID según la pestaña activa
      const res = await fetch(`/api/clinica/${clinicaId}`);
      if (!res.ok) throw new Error('');
      const data = await res.json();
      setFormData(data);
    } catch (err) {
      console.error('', err);
      setFlashMessage('');
    }
  };

  fetchClinica();
}, [tabActiva]); // Ahora vuelve a ejecutarse cada vez que cambies de pestaña

  
  
  const handleTabClick = (tab) => {
    setTabActiva(tab.id);
    navigate(tab.path);
  };

  /*FLASH DE LOS BOTONES DE ABAJO*/ 
  const [flashMessage, setFlashMessage] = useState('');
  const showFlash = (text) => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 3000);  // 3000 ms = 3 segundos
  };
  
  const handleDelete = (e) => {
    e.preventDefault();
    // aquí tu lógica de eliminar...
    showFlash('🗑️ Eliminado correctamente');
  };
  

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};


  const handleEdit = (e) => {
    e.preventDefault();
    setModoEdicion(true);
    showFlash('🖋️ Modo edición activado');
  };

const handleSave = async (e) => {
  e.preventDefault();
  setModoEdicion(false);
  showFlash('💾 Cambios guardados');

  try {
    const clinicaId = tabActiva === 'clinica14' ? 2 : 3; // Aquí también definimos el ID según la pestaña activa
    const res = await fetch(`/api/clinica/${clinicaId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error('Error al guardar');
    showFlash('✅ Cambios guardados correctamente');
  } catch (error) {
    console.error(error);
    showFlash('❌ Error al guardar los cambios');
  }
};



  const renderFormularioClinica = (titulo) => (
    <div className="clinica-bloque">
      <h2 className="clinica-titulo">{titulo}</h2>
      <div className="clinica-fila">
        <div className="clinica-columna-izquierda">
          <label>Nombre:</label>
          <input
                type="text"
  className={`clinica-input ${modoEdicion ? 'editable' : 'readonly'}`}
                name="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                disabled={!modoEdicion}
              />
          <label>Ubicación:</label>
          <input
              type="text"
  className={`clinica-input ${modoEdicion ? 'editable' : 'readonly'}`}
              name="ubicacion"
              value={formData.ubicacion}
              onChange={handleInputChange}
              disabled={!modoEdicion}
            />
          <label>Correo:</label>
          <input
                  type="email"
  className={`clinica-input ${modoEdicion ? 'editable' : 'readonly'}`}
                  name="correo"
                  value={formData.correo}
                  onChange={handleInputChange}
                  disabled={!modoEdicion}
                />
          <label>Teléfono:</label>
          <input
                type="tel"
  className={`clinica-input ${modoEdicion ? 'editable' : 'readonly'}`}
                name="telefono"
                value={formData.telefono}
                onChange={handleInputChange}
                disabled={!modoEdicion}
              />        
        </div>

<div className="clinica-columna-derecha">
  <label htmlFor="horario-apertura" className="clinica-label apertura-label">
    Hora Apertura:
  </label>
        <input
          type="time"
          id="horario-apertura"
          name="apertura"
  className={`clinica-input ${modoEdicion ? 'editable' : 'readonly'}`}
          value={formData.apertura}
          onChange={handleInputChange}
          disabled={!modoEdicion}
        />

  <label htmlFor="horario-cierre" className="clinica-label cierre-label">
    Hora Cierre:
  </label>
        <input
          type="time"
          id="horario-cierre"
          name="cierre"
  className={`clinica-input ${modoEdicion ? 'editable' : 'readonly'}`}
          value={formData.cierre}
          onChange={handleInputChange}
          disabled={!modoEdicion}
        />
</div>

      </div>
    </div>
  );

  return (
    <div className="clinica-contenedor">
      <h2 className="clinica-encabezado">Clínicas</h2>
      <hr />

      {/* ——— Tabs de navegación ——— */}
      <nav className="inv-tabs" aria-label="Secciones de Clínica">
        {tabConfig.map(tab => (
          <button
            key={tab.id}
            type="button"
            className={`inv-tab ${tabActiva === tab.id ? 'active' : ''}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      <motion.section
        className="clinica-formulario"
        variants={slideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={slideVariants.transition}
      >
        {/* ——— Formularios según la pestaña activa ——— */}
        {tabActiva === 'clinica14' && renderFormularioClinica('Clínica Zona 14 Guatemala')}
        {tabActiva === 'clinicaJalapa' && renderFormularioClinica('Clínica Jalapa')}

        {/* ——— Botones de acción ——— */}
            <div className="clinic-form-buttons">
                {flashMessage && (
                <div className="flash-message">{flashMessage}</div>)}
              <button type="button" className="clinic-btn-back" onClick={() => navigate(-1)}>REGRESAR</button>
              <button onClick={handleDelete} className="clinic-btn-delete">ELIMINAR</button>
              <button onClick={handleEdit} className="clinic-btn-edit">EDITAR</button>
              <button onClick={handleSave} className="clinic-btn-add">GUARDAR</button>
            </div>


      </motion.section>
    </div>
  );
};

export default Clinica;
