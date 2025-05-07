import React from 'react';
import './empleados.css';
import { useNavigate } from "react-router-dom";

function Empleados() {
const navigate = useNavigate();

  return (
    <div>
      <main className="empleados-content">
        <h1 className="titulo-empleados">Empleados</h1>
          <div className="subtitulo-empleados">
        <h2>Registro de Empleados</h2>
    </div>
                <div className="empleados-busqueda">
          <label htmlFor="buscar">Buscar:</label>
          <input type="text" id="buscar" placeholder="Buscar empleado..." />
          <button className="btn-agregar">AGREGAR NUEVO EMPLEADO</button>
          <button className="btn-filtro">FILTRO</button>
        </div>
        <div className="empleados-lista-scroll">
          {Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i)).map((letter) => (
            <div className="empleados-seccion" key={letter}>
              <h2>{letter}</h2>
              <ul>
                <li>{letter}nombre</li>
                <li>{letter}nombre</li>
                <li>{letter}nombre</li>
                <li>{letter}nombre</li>
                <li>{letter}nombre</li>
              </ul>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Empleados;