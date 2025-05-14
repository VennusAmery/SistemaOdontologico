//habitos.js
const express = require('express');
const router = express.Router();

module.exports = (pool) => {
  // Ruta para insertar un nuevo hábito
router.post('/habitos', async (req, res) => {
  const {
    id_paciente,
    fecha_registro,
    rechinar,
    chupar,
    lengua,
    unas,
    morder,
    respirar_boca
  } = req.body;

  // Validar datos requeridos
  if (!id_paciente || !fecha_registro) {
    return res.status(400).json({ error: 'id_paciente y fecha_registro son obligatorios' });
  }

  try {
    const [result] = await pool.query(
      `INSERT INTO habito 
      (id_paciente, fecha_registro, rechinar, chupar, lengua, unas, morder, respirar_boca) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id_paciente, fecha_registro, rechinar, chupar, lengua, unas, morder, respirar_boca]
    );

    // Devolver el ID del registro recién creado
    res.status(201).json({
      message: 'Hábito guardado correctamente',
      id_habito: result.insertId // Aquí se incluye el ID del registro
    });
  } catch (err) {
    console.error('Error al guardar hábito:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

  return router;
};
