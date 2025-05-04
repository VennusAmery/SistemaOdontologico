import React from 'react';
import './programarcita.css';
import { useNavigate } from 'react-router-dom';

function ProgramarCita() {
  const navigate = useNavigate();

  return (
    <div className="programar-cita-content">
      <h1 className="titulo-citas">Citas</h1>
      <div className="subtitulo-citas">
      <h2>Programar Cita</h2>
      </div>
      <form className="formulario-cita">
        <div className="form-grid">
          <div>
            <label htmlFor="dpi">DPI Paciente:</label>
            <input type="text" id="dpi" name="dpi" />
          </div>
          <div>
            <label htmlFor="doctor">Doctor encargado:</label>
            <input type="text" id="doctor" name="doctor" />
          </div>
          <div>
            <label htmlFor="fecha">Fecha:</label>
            <input type="date" id="fecha" name="fecha" />
          </div>
          <div>
            <label htmlFor="codigo-clinica">Código Clínica:</label>
            <input type="text" id="codigo-clinica" name="codigo-clinica" />
          </div>
          <div>
            <label htmlFor="hora">Hora:</label>
            <input type="time" id="hora" name="hora" />
          </div>
          <div>
            <label htmlFor="monto">Monto a Cobrar:</label>
            <input type="number" id="monto" name="monto" />
          </div>
          <div className="mayoria-edad">
            <span>Mayoría de Edad:</span>
            <label htmlFor="mayoria-si">
              <input type="radio" id="mayoria-si" name="mayoria" value="si" />
              Sí
            </label>
            <label htmlFor="mayoria-no">
              <input type="radio" id="mayoria-no" name="mayoria" value="no" />
              No
            </label>
          </div>
        </div>
        
        <div className="botones-acciones">
  <button type="button" className="btn-guardar">GUARDAR</button>  
  <button type="button" className="btn-confirmar">CONFIRMAR</button>
  <button type="button" className="btn-editar">EDITAR</button>
  <button type="button" className="btn-eliminar">ELIMINAR</button>
  <button type="button" className="btn-regresar" onClick={() => navigate('/citas')}>REGRESAR</button>
</div>
      </form>
    </div>
  );
}

export default ProgramarCita;