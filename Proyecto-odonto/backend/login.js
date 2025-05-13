// login.js
const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  // Ruta para login
  router.post('/login', async (req, res) => {  // Cambié "/api/login" a "/login"
    const { usuario, password } = req.body;
    console.log("📥 Login recibido:", req.body);

    try {
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

  // Ruta para registro
  router.post('/register', async (req, res) => {  // Cambié "/api/register" a "/register"
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

  return router;
};
