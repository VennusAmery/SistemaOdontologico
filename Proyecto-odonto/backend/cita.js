const express = require('express');
module.exports = function(pool) {
  const router = express.Router();

  // Listar todas las citas
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query(`
        SELECT 
          c.*, 
          p.nombre AS paciente_nombre 
        FROM cita c
        LEFT JOIN paciente p ON c.id_paciente = p.dpi
        ORDER BY c.fecha DESC, c.hora DESC
      `);
      res.json(rows);
    } catch (err) {
      console.error('Error al listar citas:', err);
      res.status(500).json({ error: 'Error al listar las citas' });
    }
  });


  // Obtener cita por ID
  router.get('/:id_cita', async (req, res) => {
    const { id_cita } = req.params;
    try {
      const [results] = await pool.query('SELECT * FROM cita WHERE id_cita = ?', [id_cita]);
      if (results.length === 0) {
        return res.status(404).json({ error: 'Cita no encontrada' });
      }
      res.json(results[0]);
    } catch (err) {
      console.error('Error al obtener cita:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  });

  // Crear nueva cita
  router.post('/', async (req, res) => {
    const { id_paciente, codigo_clinica, doctor_encargado, hora, fecha, monto_a_cobrar } = req.body;
    try {
      const [result] = await pool.query(
        `INSERT INTO cita (id_paciente, codigo_clinica, doctor_encargado, hora, fecha, monto_a_cobrar)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id_paciente, codigo_clinica, doctor_encargado, hora, fecha, monto_a_cobrar]
      );
      res.status(201).json({ message: 'Cita guardada correctamente', id_cita: result.insertId });
    } catch (err) {
      console.error('Error al insertar cita:', err);
      res.status(500).json({ error: 'Error al guardar la cita' });
    }
  });

  // Actualizar cita existente
  router.put('/:id_cita', async (req, res) => {
    const { id_cita } = req.params;
    const { id_paciente, codigo_clinica, doctor_encargado, hora, fecha, monto_a_cobrar } = req.body;
    try {
      await pool.query(
        `UPDATE cita 
         SET id_paciente = ?, codigo_clinica = ?, doctor_encargado = ?, hora = ?, fecha = ?, monto_a_cobrar = ?
         WHERE id_cita = ?`,
        [id_paciente, codigo_clinica, doctor_encargado, hora, fecha, monto_a_cobrar, id_cita]
      );
      res.json({ message: 'Cita actualizada correctamente' });
    } catch (err) {
      console.error('Error al actualizar cita:', err);
      res.status(500).json({ error: 'Error al actualizar la cita' });
    }
  });

  // Eliminar cita
  router.delete('/:id_cita', async (req, res) => {
    const { id_cita } = req.params;
    try {
      await pool.query('DELETE FROM cita WHERE id_cita = ?', [id_cita]);
      res.json({ message: 'Cita eliminada correctamente' });
    } catch (err) {
      console.error('Error al eliminar cita:', err);
      res.status(500).json({ error: 'Error al eliminar la cita' });
    }
  });

  return router;
};
