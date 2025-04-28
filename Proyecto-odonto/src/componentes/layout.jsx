import React from 'react';
import './layout.css';
import { useNavigate, Outlet } from "react-router-dom"; // Añade Outlet

function Layout() {
  const navigate = useNavigate();

  return (
    <div className="rectangulo-superior">
      <div class="main-container">
        <aside className="sidebar">
          <div className="rectangulo">
            <div className="rectangulo--2">
              <img src="/imagenes/largeLogoD.png" alt="Logo" 
                onClick={() => navigate('/home')} /* Redirige a /home */
                style={{ cursor: 'pointer' }} /* Cambia el cursor al pasar sobre el logo */
              />
            </div>
          </div>

          <div className="user-info">
            <p>USUARIO</p>
            <p>usuario@gmail.com</p>
          </div>

          <nav className="sidebar-nav">
            <button onClick={() => navigate('/pacientes')} >
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
          <Outlet /> {/* Esto renderizará Home.jsx, Pacientes.jsx, etc. */}
        </main>
      </div>
      </div>
  );
}

export default Layout;