// server.js
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2/promise");

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'dani',
    password: '1234',
    database: 'ODONTOLOGIA',
  });

  await pool.query('SELECT 1');
  console.log('✅ MySQL pool conectado');

  // Login sin encriptado
  app.post('/api/login', async (req, res) => {
    const { usuario, password } = req.body;
    console.log("📥 Login recibido:", req.body);

    try {
      // Buscamos por usuario en minúsculas
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE LOWER(usuario) = LOWER(?)',
        [usuario]
      );

      if (rows.length === 0) {
        console.log("❌ Usuario no encontrado");
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      const user = rows[0];
      console.log("👤 Usuario encontrado:", user);

      if (password === user.password) {
        console.log("✅ Login exitoso");
        return res.status(200).json({
          message: 'Login exitoso',
          usuario: user.usuario
        });
      } else {
        console.log("❌ Contraseña incorrecta — Enviado:", password, "DB:", user.password);
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } catch (error) {
      console.error('❌ Error al hacer login:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  // Registro sin encriptado
  app.post('/api/register', async (req, res) => {
    const { usuario, password } = req.body;
    console.log("📥 Registro recibido:", req.body);

    try {
      await pool.query(
        'INSERT INTO usuarios (usuario, password) VALUES (?, ?)',
        [usuario, password]
      );
      res.status(201).json({ message: 'Usuario registrado correctamente' });
    } catch (error) {
      console.error('❌ Error al registrar:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  app.listen(4000, () => console.log('🟢 Servidor en http://localhost:4000'));
}

startServer();
