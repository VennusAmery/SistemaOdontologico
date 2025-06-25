import React, { useState } from 'react';
import './login.css';
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const { data } = await axios.post('http://localhost:4000/api/login', {
      usuario,
      password,
    });

    console.log('✅ Login OK:', data);

    // Guarda username + nombre
localStorage.setItem('user', JSON.stringify({
  username: data.usuario,
  nombre: data.nombre
}));



  console.log('🔑 User guardado:', localStorage.getItem('user'));

    navigate('/home');
  } catch (err) {
    console.error('❌ Login error:', err.response || err);
    if (err.response) {
      setError(err.response.data.mensaje || 'Error de autenticación');
      console.log('Detalles del error:', err.response.data);
    } else if (err.request) {
      setError('No se pudo conectar al servidor');
    } else {
      setError('Error inesperado');
    }
  }
};

  return (
    <div className="login-container">
      <div className="formulario">
        <div className="circulo">
          <div className="circulo--2">
            <img src="/imagenes/smallLogoD.png" alt="Logo" />
          </div>
        </div>
        <div className="border">
          <h1>OPTIMA DENTAL</h1>
          <form onSubmit={handleSubmit}>
            <div className="campo">
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                required
              />
              <label>Usuario</label>
            </div>
            <div className="campo">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label>Contraseña</label>
            </div>

            {error && <p className="error">{error}</p>}

            <div className="recordar">
              ¿Olvidó su contraseña? <Link to="/olvidecontraseña">Recupérala</Link>
            </div>

            <input type="submit" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
}
