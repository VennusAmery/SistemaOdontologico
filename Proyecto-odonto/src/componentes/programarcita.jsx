import React, { useState } from 'react';
import './programarcita.css';
import { useNavigate } from 'react-router-dom';

function ProgramarCita() {
  const navigate = useNavigate();
  const [flashMessage, setFlashMessage] = useState('');

  const showFlash = (text) => {
    setFlashMessage(text);
    setTimeout(() => setFlashMessage(''), 3000);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    showFlash('🗑️ Eliminado correctamente');
  };

  const handleEdit = (e) => {
    e.preventDefault();
    showFlash('🖋️ Editado correctamente');
  };

  const handleSave = (e) => {
    e.preventDefault();
    showFlash('💾 Guardado correctamente');
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    showFlash('✅ Confirmado correctamente');
  };

  return (
    <div className="programarcita-content">
      <h1 className="programarcita-titulo">Citas</h1>
      <div className="programarcita-subtitulo">
        <h2>Programar Cita</h2>
      </div>
      <form className="programarcita-formulario">
        <div className="programarcita-form-grid">
          <div>
            <label htmlFor="programarcita-dpi">DPI Paciente:</label>
            <input type="text" id="programarcita-dpi" name="programarcita-dpi" />
          </div>
          <div>
            <label htmlFor="programarcita-doctor">Doctor encargado:</label>
            <input type="text" id="programarcita-doctor" name="programarcita-doctor" />
          </div>
          <div>
            <label htmlFor="programarcita-fecha">Fecha:</label>
            <input type="date" id="programarcita-fecha" name="programarcita-fecha" />
          </div>
          <div>
            <label htmlFor="programarcita-codigo-clinica">Código Clínica:</label>
            <input type="text" id="programarcita-codigo-clinica" name="programarcita-codigo-clinica" />
          </div>
          <div>
            <label htmlFor="programarcita-hora">Hora:</label>
            <input type="time" id="programarcita-hora" name="programarcita-hora" />
          </div>
          <div>
            <label htmlFor="programarcita-monto">Monto a Cobrar:</label>
            <input type="number" id="programarcita-monto" name="programarcita-monto" />
          </div>
          <div className="programarcita-mayoria-edad">
            <span>Mayoría de Edad:</span>
            <label htmlFor="programarcita-mayoria-si">
              <input type="radio" id="programarcita-mayoria-si" name="programarcita-mayoria" value="si" />
              Sí
            </label>
            <label htmlFor="programarcita-mayoria-no">
              <input type="radio" id="programarcita-mayoria-no" name="programarcita-mayoria" value="no" />
              No
            </label>
          </div>
        </div>

        <div className="programarcita-botones">
          {flashMessage && (
            <div className="flash-message">{flashMessage}</div>
          )}
          <button type="button" className="programarcita-btn-guardar" onClick={handleSave}>GUARDAR</button>
          <button type="button" className="programarcita-btn-confirmar" onClick={handleConfirm}>CONFIRMAR</button>
          <button type="button" className="programarcita-btn-editar" onClick={handleEdit}>EDITAR</button>
          <button type="button" className="programarcita-btn-eliminar" onClick={handleDelete}>ELIMINAR</button>
          <button type="button" className="programarcita-btn-regresar" onClick={() => navigate('/citas')}>REGRESAR</button>
        </div>
      </form>
    </div>
  );
}

export default ProgramarCita;
