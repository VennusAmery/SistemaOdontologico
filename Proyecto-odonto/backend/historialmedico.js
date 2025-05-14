const express = require('express');
const router = express.Router();

module.exports = function (pool) {
  // Ruta para insertar historial médico
  router.post('/', async (req, res) => {
    try {
      const {
        id_paciente,
        fecha_registro,
        padecimiento,
        tipo_enfermedad,
        hospitalizacion,
        tipo_hospitalizacion,
        usa_medicamentos,
        tipos_medicamentos,
        alergias,
        tipos_alergias,
        embarazo,
        meses_embarazo,
        lactancia,
        desarrollo,
      } = req.body;

      const sql = `
        INSERT INTO historial_medico (
          id_paciente, fecha_registro, padecimiento, tipo_enfermedad,
          hospitalizacion, tipo_hospitalizacion, usa_medicamentos,
          tipos_medicamentos, alergias, tipos_alergias,
          embarazo, meses_embarazo, lactancia, desarrollo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      await pool.query(sql, [
        id_paciente,
        fecha_registro,
        padecimiento,
        tipo_enfermedad,
        hospitalizacion,
        tipo_hospitalizacion,
        usa_medicamentos,
        tipos_medicamentos,
        alergias,
        tipos_alergias,
        embarazo,
        meses_embarazo,
        lactancia,
        desarrollo,
      ]);

      res.status(201).json({ message: '✅ Historial médico guardado con éxito' });
    } catch (error) {
      console.error('❌ Error al insertar historial médico:', error);
      res.status(500).json({ error: 'Error al guardar historial médico' });
    }
  });

  return router;
};

