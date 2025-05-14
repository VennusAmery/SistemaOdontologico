const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  // Ruta para crear un paciente (con contacto y dirección)
  router.post('/pacientes', async (req, res) => {
    console.log('📥 req.body:', req.body);

    const { paciente, contacto, direccion } = req.body;

    if (!paciente || !contacto || !direccion) {
      return res.status(400).json({ error: 'Datos incompletos' });
    }

    const connection = await pool.getConnection();

    try {
      await connection.beginTransaction();

      // 1. Insertar en la tabla paciente
      const sqlPaciente = `
        INSERT INTO paciente (dpi, nombre, apellido, fecha_nacimiento, edad, sexo, estado_civil, ocupacion, motivo_consulta)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const paramsPaciente = [
        paciente.dpi,
        paciente.nombre,
        paciente.apellido,
        paciente.fecha_nacimiento,
        paciente.edad,
        paciente.sexo,
        paciente.estado_civil,
        paciente.ocupacion,
        paciente.motivo_consulta
      ];
      await connection.execute(sqlPaciente, paramsPaciente);

      // 2. Insertar en contacto_paciente
      const sqlContacto = `
        INSERT INTO contacto_paciente (id_paciente, telefono_movil, telefono_fijo, telefono_trabajo, correo)
        VALUES (?, ?, ?, ?, ?)
      `;
      const paramsContacto = [
        paciente.dpi,
        contacto.telefono_movil,
        contacto.telefono_fijo,
        contacto.telefono_trabajo,
        contacto.correo
      ];
      await connection.execute(sqlContacto, paramsContacto);

      // 3. Insertar en direccion_paciente
      const sqlDireccion = `
        INSERT INTO direccion_paciente (id_paciente, direccion_casa, direccion_trabajo)
        VALUES (?, ?, ?)
      `;
      const paramsDireccion = [
        paciente.dpi,
        direccion.direccion_casa,
        direccion.direccion_trabajo
      ];
      await connection.execute(sqlDireccion, paramsDireccion);

      await connection.commit();
      connection.release();

      console.log('✅ Paciente insertado correctamente');
      return res.status(201).json({ message: 'Paciente creado correctamente' });
    } catch (err) {
      await connection.rollback();
      connection.release();
      console.error('❌ Error al insertar paciente:', err.message);
      return res.status(500).json({ error: 'Error al insertar paciente en la base de datos' });
    }
  });

  return router;
};
