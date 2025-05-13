// routes/listadoproveedores.js
const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  // 1️GET /api/proveedores → lista todos los proveedores
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT id_proveedor, nombre FROM proveedor');
      res.json(rows); // devuelve [{ id_proveedor: 1, nombre: 'Avenida' }, ...]
    } catch (err) {
      console.error('❌ Error al listar proveedores:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  // POST /api/proveedores → ya lo tenías
  router.post('/', /* ... */);

  return router;
};
