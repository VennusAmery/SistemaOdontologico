// routes/layoutusuario.js
const express = require('express');
const router = express.Router();

router.get('/me', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const userId = req.session.userId;
    if (!userId) return res.status(401).json({ error: 'No autenticado' });

    const [rows] = await pool.query(
      'SELECT id_usuario AS id, Usuario AS usuario, correo FROM usuarios WHERE id_usuario = ?',
      [userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});


module.exports = router;
