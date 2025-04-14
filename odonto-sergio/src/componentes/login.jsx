import React from 'react';
import './login.css';

function App() {
  return (
    <div className="formulario">
      <div className="circulo">
        <div className="circulo--2">
          <img src="/imagenes/smallLogoD.png" alt="Logo" />
        </div>
      </div>
      <div className="border">
        <h1>OPTIMA DENTAL</h1>
        <form method="post">
          <div className="campo">
            <input type="text" required />
            <label>Usuario</label>
          </div>
          <div className="campo">
            <input type="password" required />
            <label>Contraseña</label>
          </div>
          <div className="recordar">
            ¿Olvidó su contraseña? <a href="/recuperar-contraseña">Recupérala</a>
          </div>
          <input type="submit" value="LOGIN" />
        </form>
      </div>
    </div>
  );
}

export default App;
