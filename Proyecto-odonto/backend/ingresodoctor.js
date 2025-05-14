const express = require('express');

module.exports = function(pool) {
  const router = express.Router();

  // 1) Leer un doctor + contacto
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      // a) Doctor
      const [docs] = await pool.execute(
        `SELECT
           id_doctor AS id,
           nombre,
           apellido,
           dpi,
           especialidad,
           honorario AS honorarios,
           id_clinica AS clinica,
           hora_entrada   AS horaEntrada,
           hora_salida    AS horaSalida
         FROM doctor
         WHERE id_doctor = ?`,
        [id]
      );
      if (!docs.length) return res.status(404).json({ error: 'Doctor no encontrado' });
      const doctor = docs[0];

      // b) Contacto
      const [cons] = await pool.execute(
        `SELECT
           telefono,
           correo        AS correoElectronico
         FROM contacto_doctor
         WHERE id_doctor = ?`,
        [id]
      );
      // Si hay un registro, úsalo; si no, devuelve cadenas vacías
      doctor.telefono         = cons[0]?.telefono || '';
      doctor.correoElectronico = cons[0]?.correoElectronico || '';

      res.json(doctor);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en servidor' });
    }
  });

  // 2) Crear doctor + contacto
  router.post('/', async (req, res) => {
    const {
      nombre, apellido, dpi, especialidad,
      honorarios, clinica, horaEntrada, horaSalida,
      telefono, correoElectronico
    } = req.body;

    try {
      // a) Inserta en doctor
      const [r] = await pool.execute(
        `INSERT INTO doctor
           (nombre, apellido, dpi, especialidad, honorario, id_clinica, hora_entrada, hora_salida)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [nombre, apellido, dpi, especialidad, honorarios, clinica, horaEntrada, horaSalida]
      );
      const idDoctor = r.insertId;

      // b) Inserta en contacto_doctor enlazado
      await pool.execute(
        `INSERT INTO contacto_doctor
           (id_doctor, telefono, correo)
         VALUES (?, ?, ?)`,
        [idDoctor, telefono, correoElectronico]
      );

      res.status(201).json({ id: idDoctor });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al crear doctor' });
    }
  });

  // 3) Actualizar doctor + contacto
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
      nombre, apellido, dpi, especialidad,
      honorarios, clinica, horaEntrada, horaSalida,
      telefono, correoElectronico, movil
    } = req.body;

    try {
      // a) Actualiza doctor
      await pool.execute(
        `UPDATE doctor
           SET nombre = ?, apellido = ?, dpi = ?, especialidad = ?, honorario = ?, id_clinica = ?, hora_entrada = ?, hora_salida = ?
         WHERE id_doctor = ?`,
        [nombre, apellido, dpi, especialidad, honorarios, clinica, horaEntrada, horaSalida, id]
      );

      // b) Upsert en contacto_doctor
      const [existing] = await pool.execute(
        `SELECT id_contacto
           FROM contacto_doctor
         WHERE id_doctor = ?`,
        [id]
      );

      if (existing.length) {
        // ya existe → UPDATE
        await pool.execute(
          `UPDATE contacto_doctor
             SET telefono = ?, correo = ?
           WHERE id_doctor = ?`,
          [telefono, correoElectronico, movil, id]
        );
      } else {
        // no existe → INSERT
        await pool.execute(
          `INSERT INTO contacto_doctor
             (id_doctor, telefono, correo)
           VALUES (?, ?, ?)`,
          [id, telefono, correoElectronico]
        );
      }

      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al actualizar doctor' });
    }
  });

  // 4) Eliminar doctor (+ cascade en contacto_doctor)
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.execute(
        `DELETE FROM doctor WHERE id_doctor = ?`,
        [id]
      );
      res.sendStatus(204);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al eliminar doctor' });
    }
  });

  return router;
};
