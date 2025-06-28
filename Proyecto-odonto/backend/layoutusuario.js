//layoutusuario.js
const express = require('express');
const router = express.Router();

router.get('/usuarios', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const [rows] = await pool.query('SELECT id_usuario AS id, usuario, correo FROM usuarios');
    res.json(rows); // Aquí debe incluir el correo
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});


module.exports = router;  
