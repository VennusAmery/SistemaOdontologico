// agregarempleado.js
const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // 1) Obtener empleado por ID
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [docs] = await pool.execute(
        `SELECT
           id_empleado AS id,
           nombre,
           apellido,
           dpi,
           fecha_nacimiento,
           direccion,
           edad,
           cargo,
           sueldo,
           turno,
           hora_entrada AS horaEntrada,
           hora_salida AS horaSalida,
           id_clinica AS clinica
         FROM empleado
         WHERE id_empleado = ?`,
        [id]
      );

      if (!docs.length) return res.status(404).json({ error: 'Empleado no encontrado' });
      const empleado = docs[0];

      // Contacto
      const [cons] = await pool.execute(
        `SELECT
           telefono,
           correo
         FROM contacto_empleado
         WHERE id_empleado = ?`,
        [id]
      );

      empleado.telefono = cons[0]?.telefono || '';
      empleado.correo = cons[0]?.correo || '';

      res.json(empleado);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en servidor' });
    }
  });

  // 2) Crear empleado + contacto
  router.post('/', async (req, res) => {
    const {
      nombre, apellido, dpi, fecha_nacimiento, direccion,
      edad, cargo, sueldo, turno, hora_Entrada, hora_Salida,
      clinica, telefono, correoElectronico
    } = req.body;

    try {
      const [r] = await pool.execute(
        `INSERT INTO empleado
           (dpi, nombre, apellido, fecha_nacimiento, direccion, edad, cargo, sueldo, turno, hora_entrada, hora_salida, id_clinica)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          dpi, nombre, apellido, fecha_nacimiento, direccion, edad,
          cargo, sueldo, turno, hora_Entrada, hora_Salida, clinica
        ]
      );

      const id_empleado = r.insertId;

      await pool.execute(
        `INSERT INTO contacto_empleado
           (id_empleado, telefono, correo)
         VALUES (?, ?, ?)`,
        [id_empleado, telefono, correoElectronico]
      );

      res.status(201).json({ id: id_empleado });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear empleado' });
    }
  });

  // 3) Actualizar empleado + contacto
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
      dpi, nombre, apellido, fecha_nacimiento, direccion,
      edad, cargo, sueldo, turno, hora_Entrada, hora_Salida,
      clinica, telefono, correoElectronico
    } = req.body;

    try {
      await pool.execute(
        `UPDATE empleado
           SET dpi = ?, nombre = ?, apellido = ?, fecha_nacimiento = ?, direccion = ?, edad = ?, cargo = ?, sueldo = ?, turno = ?, hora_entrada = ?, hora_salida = ?, id_clinica = ?
         WHERE id_empleado = ?`,
        [
          dpi, nombre, apellido, fecha_nacimiento, direccion, edad,
          cargo, sueldo, turno, hora_Entrada, hora_Salida, clinica, id
        ]
      );

      const [existing] = await pool.execute(
        `SELECT id_contacto FROM contacto_empleado WHERE id_empleado = ?`,
        [id]
      );

      if (existing.length) {
        await pool.execute(
          `UPDATE contacto_empleado
             SET telefono = ?, correo = ?
           WHERE id_empleado = ?`,
          [telefono, correoElectronico, id]
        );
      } else {
        await pool.execute(
          `INSERT INTO contacto_empleado
             (id_empleado, telefono, correo)
           VALUES (?, ?, ?)`,
          [id, telefono, correoElectronico]
        );
      }
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar empleado' });
    }
  });

  // 4) Eliminar empleado
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Elimina primero el contacto si existe
    await pool.execute(`DELETE FROM contacto_empleado WHERE id_empleado = ?`, [id]);

    // Luego elimina al empleado
    await pool.execute(`DELETE FROM empleado WHERE id_empleado = ?`, [id]);

    res.sendStatus(204);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar empleado' });
  }
});


  return router;
};
