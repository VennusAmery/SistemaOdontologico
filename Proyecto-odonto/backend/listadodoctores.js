const express = require('express');

module.exports = function(pool) {
  const router = express.Router();

  // GET /api/listadodoctores
  router.get('/', async (req, res) => {
    try {
      // Consulta todos los doctores, solo id y nombre, ordenados por nombre
      const [rows] = await pool.query(
        `SELECT id_doctor AS id, nombre
           FROM doctor
          ORDER BY nombre ASC`
      );

      // Si no hay doctores, devolvemos un mensaje claro
      if (rows.length === 0) {
        return res.status(404).json({ message: 'No se encontraron doctores' });
      }

      // Devuelves el array de filas
      return res.json(rows);
    } catch (error) {
      console.error('Error al recuperar listado de doctores:', error);
      return res.status(500).json({ error: 'No fue posible obtener el listado de doctores' });
    }
  });

  return router;
};
