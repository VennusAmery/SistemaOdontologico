const express = require('express');
const router = express.Router();

module.exports = function (pool) {

 // Obtener todos los pacientes (nombre + dpi) - Ruta para listar
  router.get('/listapacientes', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT dpi as id_paciente, nombre, apellido FROM paciente');
      return res.json(rows);
    } catch (err) {
      console.error('❌ Error al listar pacientes:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  // Obtener un paciente por su DPI con su contacto y dirección
router.get('/:dpi', async (req, res) => {
  const { dpi } = req.params;

    try {
      const [rows] = await pool.query(`
        SELECT 
          p.dpi,
          p.nombre,
          p.apellido,
          p.fecha_nacimiento,
          p.sexo,
          p.estado_civil,
          p.ocupacion,
          p.motivo_consulta,
          p.edad,
          cp.telefono_movil,
          cp.telefono_fijo,
          cp.telefono_trabajo,
          cp.correo,
          dp.direccion_casa,
          dp.direccion_trabajo
        FROM paciente p
        LEFT JOIN contacto_paciente cp ON cp.id_paciente = p.dpi
        LEFT JOIN direccion_paciente dp ON dp.id_paciente = p.dpi
        WHERE p.dpi = ?
      `, [dpi]);

      if (!rows.length) return res.status(404).json({ error: 'Paciente no encontrado' });
      res.json(rows[0]);
    } catch (err) {
      console.error('❌ Error al obtener paciente:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  // Crear paciente con contacto y dirección
  router.post('/', async (req, res) => {
    const {
      dpi, nombre, apellido, fecha_nacimiento, sexo, estado_civil,
      ocupacion, motivo_consulta, edad,
      telefono_movil, telefono_fijo, telefono_trabajo, correo,
      direccion_casa, direccion_trabajo
    } = req.body;

    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      await conn.execute(`
        INSERT INTO paciente (dpi, nombre, apellido, fecha_nacimiento, sexo, estado_civil, ocupacion, motivo_consulta, edad)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `, [dpi, nombre, apellido, fecha_nacimiento, sexo, estado_civil, ocupacion, motivo_consulta, edad]);

      await conn.execute(`
        INSERT INTO contacto_paciente (id_paciente, telefono_movil, telefono_fijo, telefono_trabajo, correo)
        VALUES (?, ?, ?, ?, ?)
      `, [dpi, telefono_movil, telefono_fijo, telefono_trabajo, correo]);

      await conn.execute(`
        INSERT INTO direccion_paciente (id_paciente, direccion_casa, direccion_trabajo)
        VALUES (?, ?, ?)
      `, [dpi, direccion_casa, direccion_trabajo]);

      await conn.commit();
      res.status(201).json({ message: 'Paciente creado exitosamente.' });
    } catch (err) {
      await conn.rollback();
      console.error('❌ Error en transacción al crear paciente:', err);
      res.status(500).json({ error: 'Error al crear paciente.' });
    } finally {
      conn.release();
    }
  });

  return router;
};
