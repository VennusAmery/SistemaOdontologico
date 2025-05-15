// routes/empleados.js
const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT
          id_empleado AS id,
          nombre,
          apellido
        FROM empleado
        ORDER BY nombre ASC
      `);

      if (rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron empleados' });
      }

      return res.json(rows);
    } catch (error) {
      console.error('Error al recuperar listado de empleados:', error);
      return res.status(500).json({ error: 'No fue posible obtener el listado de empleados' });
    }
  });

  return router;
};
