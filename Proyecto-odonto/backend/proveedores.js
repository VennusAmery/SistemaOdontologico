// routes/proveedores.js
const express = require('express');
const router = express.Router();

module.exports = function(pool) {
  // Ruta para crear un proveedor + su contacto en una transacción
  router.post('/', async (req, res) => {
    console.log('📥 Petición recibida para crear proveedor:', req.body);

    const { nombre, ubicacion, nit, telefono, correo } = req.body;
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      // insertar en proveedor
      const [result] = await conn.execute(
        `INSERT INTO proveedor (id_tipo_proveedor, nombre, ubicacion, nit)
         VALUES (?, ?, ?, ?)`,
        [1, nombre, ubicacion, nit]
      );
      const nuevoIdProveedor = result.insertId;
      console.log('✅ Proveedor insertado con ID:', nuevoIdProveedor);

      // insertar en contacto_proveedor
      await conn.execute(
        `INSERT INTO contacto_proveedor (id_proveedor, telefono, correo)
         VALUES (?, ?, ?)`,
        [nuevoIdProveedor, telefono, correo]
      );
      console.log('✅ Contacto insertado para proveedor');

      await conn.commit();
      res.status(201).json({ id: nuevoIdProveedor, message: 'Proveedor creado exitosamente.' });
    } catch (err) {
      await conn.rollback();
      console.error('❌ Error en transacción:', err);
      res.status(500).json({ error: 'Error al crear proveedor.' });
    } finally {
      conn.release();
    }
  });

  return router;
};
