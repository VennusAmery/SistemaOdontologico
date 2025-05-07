import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './agregarempleado.css';

function AgregarEmpleado() {
  const [activeTab, setActiveTab] = useState('informacion'); // Estado para la pestaña activa

  return (
    <div>
      <main className="agregar-empleado-content">
        <h1 className="titulo-empleados">Empleados</h1>
        <div className="encabezado-agregar-empleado">
          <h2>Agregar nuevo Empleado</h2>
        </div>

        {/* Nueva sección con imagen y texto */}
        <div className="agregarempleado-header">
          <div className="agregarempleado-title">
            <div className="icon-circle-empleado">
              <img src="/imagenes/iconoUsuario.png" alt="Empleado" className="circle-image-empleado" />
            </div>
            <h3 className="titulo-empleado">Sofía Vergara</h3>
          </div>
        </div>

        {/* Pestañas de navegación */}
        <div className="empleado-tabs">
          <button
            className={`tab ${activeTab === 'informacion' ? 'active' : ''}`}
            onClick={() => setActiveTab('informacion')}
          >
            Información empleado
          </button>
          <button
            className={`tab ${activeTab === 'contacto' ? 'active' : ''}`}
            onClick={() => setActiveTab('contacto')}
          >
            Contacto
          </button>
        </div>

        {/* Contenido de las pestañas */}
        <div className="tab-content">
          {activeTab === 'informacion' && (
            <div>
              <div className="agregar-empleado-form">
                <div className="agregar-empleado-columns">
                  
                  {/* Primera columna */}
                  <div className="agregar-empleado-column">
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-dpi">DPI:</label>
                      <input type="text" id="agregar-empleado-dpi" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-fecha-nacimiento">Fecha de Nacimiento:</label>
                      <input type="date" id="agregar-empleado-fecha-nacimiento" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-direccion">Dirección:</label>
                      <input type="text" id="agregar-empleado-direccion" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-estado-civil">Estado Civil:</label>
                      <input type="text" id="agregar-empleado-estado-civil" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-clinica">Clínica:</label>
                      <input type="text" id="agregar-empleado-clinica" className="agregar-empleado-input" />
                    </div>
                  </div>

                  {/* Segunda columna */}
                  <div className="agregar-empleado-column">
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-nombre">Nombre:</label>
                      <input type="text" id="agregar-empleado-nombre" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-apellido">Apellido:</label>
                      <input type="text" id="agregar-empleado-apellido" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-edad">Edad:</label>
                      <input type="number" id="agregar-empleado-edad" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-sexo">Sexo:</label>
                      <input type="text" id="agregar-empleado-sexo" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-cargo">Cargo:</label>
                      <input type="text" id="agregar-empleado-cargo" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-sueldo">Sueldo:</label>
                      <input type="number" id="agregar-empleado-sueldo" className="agregar-empleado-input" />
                    </div>
                  </div>
                </div>

                {/* Hora de entrada y salida */}
                <div className="agregar-empleado-row">
                  <label htmlFor="agregar-empleado-hora-entrada">Hora Entrada:</label>
                  <input type="time" id="agregar-empleado-hora-entrada" className="agregar-empleado-input" />
                  <label htmlFor="agregar-empleado-hora-salida">Hora Salida:</label>
                  <input type="time" id="agregar-empleado-hora-salida" className="agregar-empleado-input" />
                </div>

                {/* Botones */}
                <div className="agregar-empleado-buttons">
                  <button className="agregar-empleado-btn guardar">GUARDAR</button>
                  <button className="agregar-empleado-btn editar">EDITAR</button>
                  <button className="agregar-empleado-btn eliminar">ELIMINAR</button>
                  <button className="agregar-empleado-btn regresar">REGRESAR</button>
                </div>
              </div>
            </div>
          )}
          {activeTab === 'contacto' && (
            <div>
              <div className="agregar-empleado-form">
                <div className="agregar-empleado-columns">

                  {/* Primera columna */}
                  <div className="agregar-empleado-column">
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-telmovil1">Telefono Movil 1:</label>
                      <input type="text" id="agregar-empleado-telmovil1" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-telcasa">Telefono de casa:</label>
                      <input type="text" id="agregar-empleado-telcasa" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-turnos">Turnos:</label>
                      <input type="text" id="agregar-empleado-turnos" className="agregar-empleado-input" />
                    </div>
                  </div>

                  {/* Segunda columna */}
                  <div className="agregar-empleado-column">
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-telmovil2">Telefono Movil 2:</label>
                      <input type="text" id="agregar-empleado-telmovil2" className="agregar-empleado-input" />
                    </div>
                    <div className="agregar-empleado-row">
                      <label htmlFor="agregar-empleado-correo">Correo Electronico:</label>
                      <input type="text" id="agregar-empleado-correo" className="agregar-empleado-input" />
                    </div>
                  </div>

                </div>

                {/* Botones */}
                <div className="agregar-empleado-buttons">
                  <button className="agregar-empleado-btn guardar">GUARDAR</button>
                  <button className="agregar-empleado-btn editar">EDITAR</button>
                  <button className="agregar-empleado-btn eliminar">ELIMINAR</button>
                  <button className="agregar-empleado-btn regresar">REGRESAR</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default AgregarEmpleado;