import React, { useState, useEffect } from 'react';
import './layout.css';
import { useNavigate, Outlet } from "react-router-dom";

function Layout() {
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(true); // Estado para mostrar/ocultar

  const [username, setUsername] = useState('Invitado');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username) {
      setUsername(user.username);
    }
  }, []);

  const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';


  return (
    <div className="rectangulo-superior">
      <div className="main-container">
        
        {/* BOTÓN TOGGLE */}
<button
  className="toggle-sidebar-button"
  onClick={() => setShowSidebar(!showSidebar)}
  title="Menú"
>
  <span className="hamburger-line"></span>
  <span className="hamburger-line"></span>
  <span className="hamburger-line"></span>
</button>

        {/* SIDEBAR */}
        {showSidebar && (
          <aside className="sidebar">
            <div className="rectangulo">
              <div className="rectangulo--2">
                <img
                  src="/imagenes/largeLogoD.png"
                  alt="Logo"
                  onClick={() => navigate('/home')}
                  style={{ cursor: 'pointer' }}
                />
              </div>
            </div>

            <div className="user-info">
              <p>{username ? username.charAt(0).toUpperCase() + username.slice(1).toLowerCase() : ''}</p>
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
        )}

        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
