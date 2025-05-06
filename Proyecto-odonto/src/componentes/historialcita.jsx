import React from 'react';
import './historialcita.css';
import { useNavigate } from "react-router-dom";

function HistorialCita() {
  const navigate = useNavigate();

  return (
    <div>
      <main className="historial-content">
        <h1 className="titulo-citas">Citas</h1>
        <div className="subtitulo-citas">
          <h2>Historial de Citas</h2>
        </div>

        {/* Barra de búsqueda */}
        <div className="busqueda-historial">
          <input type="text" placeholder="Buscar..." className="input-busqueda" />
          <button className="btn-busqueda">BÚSQUEDA</button>
        </div>

        <div className="tabla-historial">
          <table>
            <thead>
              <tr>
                <th>Nombre Paciente</th>
                <th>Fecha de Cita</th>
                <th>Estado Cita</th>
              </tr>
            </thead>
            <tbody>
              {/* Ejemplo de datos estáticos */}
              <tr>
                <td>Juan Pérez</td>
                <td>05/05/2025</td>
                <td>Completada</td>
              </tr>
              <tr>
                <td>María López</td>
                <td>04/05/2025</td>
                <td>Cancelada</td>
              </tr>
            </tbody>
          </table>
        </div>

        <button className="btn-regresar-historial" onClick={() => navigate('/citas')}>REGRESAR</button>
      </main>
    </div>
  );
}

export default HistorialCita;