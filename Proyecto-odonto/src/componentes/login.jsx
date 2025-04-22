import React from 'react';
import './login.css';
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    navigate('/home'); 
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
              <input type="text" required />
              <label>Usuario</label>
            </div>
            <div className="campo">
              <input type="password" required />
              <label>Contraseña</label>
            </div>
            <div className="recordar">
              ¿Olvidó su contraseña?{" "}
              <Link to="/olvidecontraseña">Recupérala</Link>
            </div>
            <input type="submit" value="LOGIN" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;

