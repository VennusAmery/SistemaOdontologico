// routes/empleadoinfo.js
const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // 1️⃣ Obtener datos del empleado por ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(
        `SELECT
           id_empleado,
           dpi,
           nombre,
           apellido,
           fecha_nacimiento,
           direccion,
           edad,
           cargo,
           sueldo,
           turno,
           hora_entrada,
           hora_salida,
           id_clinica
         FROM empleado
         WHERE id_empleado = ?`,
        [id]
      );
      if (rows.length === 0) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Error al obtener empleado:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

// ✅ Ruta: Obtener contactos del empleado
router.get('/:id/contactos', async (req, res) => {
  const { id } = req.params;
  const [rows] = await pool.query(
    'SELECT telefono, correo FROM contacto_empleado WHERE id_empleado = ?',
    [id]
  );
  res.json(rows);
});

  // 3️⃣ (Opcional) Combinar en un solo endpoint
  router.get('/:id/full', async (req, res) => {
    const { id } = req.params;
    try {
      const [[empleado]] = await pool.query(
        `SELECT
           id_empleado,
           dpi,
           nombre,
           apellido,
           fecha_nacimiento,
           direccion,
           edad,
           cargo,
           sueldo,
           turno,
           hora_entrada,
           hora_salida,
           id_clinica
         FROM empleado
         WHERE id_empleado = ?`,
        [id]
      );
      if (!empleado) {
        return res.status(404).json({ error: 'Empleado no encontrado' });
      }
      const [contactos] = await pool.query(
        `SELECT id_contacto, telefono, correo
         FROM contacto_empleado
         WHERE id_empleado = ?`,
        [id]
      );
      res.json({ empleado, contactos });
    } catch (err) {
      console.error('Error al obtener datos completos del empleado:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  return router;
};
