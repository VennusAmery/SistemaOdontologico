const express = require('express');
const router = express.Router();

module.exports = function (pool) {
  // Ruta para insertar historial médico
  router.post('/historialmedico', async (req, res) => {
    try {
      const {
        id_paciente,
        fecha_registro,
        padecimiento = 0,
        tipo_enfermedad = null,
        hospitalizacion = 0,
        tipo_hospitalizacion = null,
        usa_medicamentos = 0,
        tipos_medicamentos = null,
        alergias = 0,
        tipos_alergias = null,
        embarazo = 0,
        meses_embarazo = null,
        lactancia = 0,
        desarrollo = null,
      } = req.body;

      // Validación de campos obligatorios
      if (!id_paciente || !fecha_registro) {
      return res.status(400).json({ 
        success: false,
        message: "ID de paciente y fecha de registro son obligatorios" 
      });
    }

      const sql = `
        INSERT INTO historial_medico (
          id_paciente, fecha_registro, padecimiento, tipo_enfermedad,
          hospitalizacion, tipo_hospitalizacion, usa_medicamentos,
          tipos_medicamentos, alergias, tipos_alergias,
          embarazo, meses_embarazo, lactancia, desarrollo
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        id_paciente,
        fecha_registro,
        padecimiento ? 1 : 0, 
        tipo_enfermedad,
        hospitalizacion ? 1 : 0,
        tipo_hospitalizacion,
        usa_medicamentos ? 1 : 0,
        tipos_medicamentos,
        alergias ? 1 : 0,
        tipos_alergias,
        embarazo ? 1 : 0,
        meses_embarazo,
        lactancia ? 1 : 0,
        desarrollo,
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

