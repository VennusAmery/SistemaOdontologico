import React from 'react';
import './tratamiento1.css';
import { useNavigate } from "react-router-dom";

function Tratamiento() {
  const navigate = useNavigate();

  return (
    <main className="tratamiento-content">
      <h1>Porfavor, seleccionar una opción de las siguientes:</h1>
      <div className="grid-botones">
      <button onClick={() => navigate('/tratamiento')}>TRATAMIENTO</button>
        <button onClick={() => navigate('/piezas')}>PIEZAS</button>
        <button onClick={() => navigate('/registros')}>REGISTRO</button>
      </div>

            <div className="acciones-formulario5">
          <button type="button" onClick={() => navigate('/fotografias')} className="btn-regresar">REGRESAR</button>
      </div>
    </main>
  );
}

export default Tratamiento;