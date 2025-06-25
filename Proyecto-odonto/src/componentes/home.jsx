import React, { useState, useEffect } from 'react';
import './home.css';
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUserData(JSON.parse(storedUser));
  }
}, []);

const capitalize = (str) =>
  str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : '';

  return (
    <main className="home-content">
      <h1>  Bienvenido {capitalize(userData?.nombre || userData?.username || 'Invitado')}</h1>
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
          <img src="/imagenes/ubicacionLogo.png" alt="Clínica" className="icono-boton2" />CLINICA
        </button> 
        <button onClick={() => navigate('/usuario')}>
          <img src="/imagenes/iconoUsuario.png" alt="usuario" className="icono-boton2" />USUARIO
        </button> 
      </div>
    </main>
  );
}

export default Home;

