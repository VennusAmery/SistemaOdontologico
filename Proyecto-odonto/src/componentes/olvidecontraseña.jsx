import React from "react";

function Olvidecontraseña() {
  return (
    <div style={styles.container}>
      <h2>Recuperar Contraseña</h2>
      <p>Ingresa tu correo electrónico para recibir instrucciones:</p>
      <input type="email" placeholder="Correo electrónico" style={styles.input} />
      <button style={styles.button}>Enviar</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "350px",
    margin: "80px auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "8px",
    fontSize: "16px"
  },
  button: {
    padding: "10px",
    backgroundColor: "#2ecc71",
    color: "#fff",
    border: "none",
    cursor: "pointer"
  }
};

export default Olvidecontraseña;
