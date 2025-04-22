import React from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="rectangulo-superior">
      <div className="home-container">   
        <aside className="sidebar">
          <div className="rectangulo">
            <div className="rectangulo--2">
              <img src="/imagenes/largeLogoD.png" alt="Logo" />
            </div>
          </div>

          <div className="user-info">
            <p>USUARIO</p>
            <p>usuario@gmail.com</p>
          </div>

          <nav className="sidebar-nav">
            <button onClick={() => navigate('/pacientes')}>
              <img src="/imagenes/pacienteLogo.png" alt="Pacientes" className="icono-boton" />PACIENTES
            </button>
            <button onClick={() => navigate('/citas')}>
              <img src="/imagenes/citasLogo.png" alt="Citas" className="icono-boton" />CITAS
            </button>
            <button onClick={() => navigate('/calendario')}>
              <img src="/imagenes/calendarioLogo.png" alt="Calendario" className="icono-boton" />CALENDARIO
            </button>
            <button onClick={() => navigate('/empleados')}>
              <img src="/imagenes/empleadosLogo.png" alt="Empleados" className="icono-boton" />EMPLEADOS
            </button>
            <button onClick={() => navigate('/contactos')}>
              <img src="/imagenes/contactoLogo.png" alt="Contactos" className="icono-boton" />CONTACTOS
            </button>
            <button onClick={() => navigate('/inventario')}>
              <img src="/imagenes/inventarioLogo.png" alt="Inventario" className="icono-boton" />INVENTARIO
            </button>
          </nav>

          <div className="sidebar-footer">
          <button onClick={() => navigate('/')}>
                <img src="/imagenes/salirLogo.png" alt="Salir" className="icono-boton3" />
            </button>
            <button onClick={() => navigate('/ajustes')}>
                <img src="/imagenes/ajustesLogo.png" alt="Ajustes" className="icono-boton3" />
            </button>
        </div>

        </aside>

        <main className="main-content">
          <h1>Bienvenido/a [USUARIO]</h1>
          <div className="grid-botones">
            <button onClick={() => navigate('/pacientes')}>
              <img src="/imagenes/pacienteLogo.png" alt="Pacientes" className="icono-boton2" />PACIENTES
            </button>
            <button onClick={() => navigate('/citas')}>
              <img src="/imagenes/citasLogo.png" alt="Citas" className="icono-boton2" />CITAS
            </button>
            <button onClick={() => navigate('/calendario')}>
              <img src="/imagenes/calendarioLogo.png" alt="Calendario" className="icono-boton2" />CALENDARIO
            </button>
            <button onClick={() => navigate('/empleados')}>
              <img src="/imagenes/empleadosLogo.png" alt="Empleados" className="icono-boton2" />EMPLEADOS
            </button>
            <button onClick={() => navigate('/contactos')}>
              <img src="/imagenes/contactoLogo.png" alt="Contactos" className="icono-boton2" />CONTACTOS
            </button>
            <button onClick={() => navigate('/inventario')}>
              <img src="/imagenes/inventarioLogo.png" alt="Inventario" className="icono-boton2" />INVENTARIO
            </button>
            <button onClick={() => navigate('/clinica')}>
              <img src="/imagenes/ubicacionLogo.png" alt="Inventario" className="icono-boton2" />CLINICA
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Home;

