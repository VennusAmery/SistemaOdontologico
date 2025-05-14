  // routes/doctores.js
  const express = require('express');
  const router = express.Router();
  
  module.exports = function(pool) {
  
  // Ruta para listar todos los doctores
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT id_proveedor, nombre FROM proveedor');
      return res.json(rows);
    } catch (err) {
      console.error('❌ Error al listar proveedores:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

    return router;
};