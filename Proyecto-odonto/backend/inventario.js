// inventario.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  
  // GET /api/materiales
  router.get('/', async (req, res) => {
    try {
      // Selecciona id_producto como id_material y nombre
      const [rows] = await pool.execute(
        `SELECT 
           id_producto   AS id_material,
           nombre
         FROM producto
         ORDER BY nombre`
      );
      res.json(rows);
    } catch (err) {
      console.error('Error al obtener materiales:', err);
      res.status(500).json({ error: 'No se pudo obtener materiales' });
    }
  });

  

  return router;
};
