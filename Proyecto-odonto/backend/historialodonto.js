//historialodonto.js
const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  router.post('/historialodonto', async (req, res) => {
    const {
      id_paciente,
      fecha_registro,
      motivo_consulta,
      fecha_ultima_consulta,
      dolor,
      dientes_dolor,
      sangrado,
      antecedentes_familiares,
      cual_diente
    } = req.body;

    try {
      const sql = `
        INSERT INTO historial_odontologico 
        (id_paciente, fecha_registro, motivo_consulta, fecha_ultima_consulta, dolor, dientes_dolor, sangrado, antecedentes_familiares, cual_diente)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        id_paciente,
        fecha_registro,
        motivo_consulta,
        fecha_ultima_consulta,
        dolor,
        dientes_dolor,
        sangrado,
        antecedentes_familiares,
        cual_diente
      ];

      const [result] = await pool.execute(sql, params);
      console.log('✅ Historial odontológico guardado');
      res.status(200).json({ message: "Guardado correctamente" });
    } catch (err) {
      console.error("❌ Error al guardar historial odontológico:", err.message);
      res.status(500).json({ message: "Error al guardar en la base de datos" });
    }
  });

  return router;
};



