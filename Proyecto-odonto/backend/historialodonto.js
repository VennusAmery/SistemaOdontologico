const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  router.post('/historialodonto', async (req, res) => {
    const {
      id_paciente,
      fecha_registro,
      motivo_consulta = null,
      fecha_ultima_consulta = null,
      dolor = 0,
      dientes_dolor = null,
      sangrado = 0,
      antecedentes_familiares = null
    } = req.body;

    // Validación de campos obligatorios
    if (!id_paciente || !fecha_registro) {
      return res.status(400).json({ 
        success: false,
        message: "ID de paciente y fecha de registro son obligatorios" 
      });
    }

    try {
      const sql = `
        INSERT INTO historial_odontologico 
        (id_paciente, fecha_registro, motivo_consulta, fecha_ultima_consulta, 
         dolor, dientes_dolor, sangrado, antecedentes_familiares)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        id_paciente,
        fecha_registro,
        motivo_consulta,
        fecha_ultima_consulta,
        dolor ? 1 : 0,  // Convertir a 1/0 para MySQL
        dientes_dolor,
        sangrado ? 1 : 0,  // Convertir a 1/0 para MySQL
        antecedentes_familiares
      ];

      const [result] = await pool.execute(sql, params);
      
      console.log('✅ Historial odontológico guardado. ID:', result.insertId);
      res.status(201).json({ 
        success: true,
        message: "Guardado correctamente",
        id: result.insertId
      });
    } catch (err) {
      console.error("❌ Error al guardar historial odontológico:", err.message);
      res.status(500).json({ 
        success: false,
        message: "Error en el servidor",
        error: err.message  // Solo en desarrollo, quitar en producción
      });
    }
  });

  return router;
};



