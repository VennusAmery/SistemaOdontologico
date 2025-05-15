const express = require('express');
module.exports = function(pool) {
  const router = express.Router();

  // Ruta para listar todas las citas
  router.get('/', async (req, res) => {
    try {
        console.log('Listando todas las citas');
        
      const [rows] = await pool.query(`
        SELECT 
          c.*, 
          p.nombre AS paciente_nombre 
        FROM cita c
        LEFT JOIN paciente p ON c.id_paciente = p.dpi
        ORDER BY c.fecha ASC, c.hora DESC
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error al listar citas:', err);
      res.status(500).json({ error: 'Error al listar las citas' });
    }
  });

  return router;
};

