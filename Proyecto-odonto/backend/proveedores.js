// routes/proveedores.js
const express = require('express');
const router = express.Router();

module.exports = function(pool) {

  // Obtiene proveedor + contacto + tipo de proveedor
   router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.query(`
        SELECT 
          p.id_proveedor,
          p.nombre,
          p.ubicacion,
          p.nit,
          tp.id_tipo_proveedor,
          tp.tipo           AS tipo_proveedor,
          cp.telefono,
          cp.correo
        FROM proveedor p
        LEFT JOIN contacto_proveedor cp 
          ON cp.id_proveedor = p.id_proveedor
        LEFT JOIN tipo_proveedor tp
          ON tp.id_tipo_proveedor = p.id_tipo_proveedor
        WHERE p.id_proveedor = ?
      `, [id]);

      if (!rows.length) return res.status(404).json({ error: 'Proveedor no encontrado' });
      res.json(rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error del servidor' });
    }
  });

  // DELETE /api/proveedores/:id
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [result] = await pool.execute(
        'DELETE FROM proveedor WHERE id_proveedor = ?',
        [id]
      );
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Proveedor no encontrado' });
      }
      res.json({ message: 'Proveedor eliminado correctamente' });
    } catch (err) {
      console.error('❌ Error al eliminar proveedor:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });


  // 4️⃣ ACTUALIZAR existente
  router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion, nit, telefono, correo, id_tipo_proveedor } = req.body;
    const conn = await pool.getConnection();
    try {
      await conn.beginTransaction();

      await conn.execute(
        'UPDATE proveedor SET id_tipo_proveedor = ?, nombre = ?, ubicacion = ?, nit = ? WHERE id_proveedor = ?',
        [id_tipo_proveedor, nombre, ubicacion, nit, id]
      );
      await conn.execute(
        'UPDATE contacto_proveedor SET telefono = ?, correo = ? WHERE id_proveedor = ?',
        [telefono, correo, id]
      );

      await conn.commit();
      res.json({ message: 'Proveedor actualizado' });
    } catch (err) {
      await conn.rollback();
      console.error('❌ Error al actualizar proveedor:', err);
      res.status(500).json({ error: 'Error en el servidor' });
    } finally {
      conn.release();
    }
  });

  // Ruta para listar todos los proveedores
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.query('SELECT id_proveedor, nombre FROM proveedor');
      return res.json(rows);
    } catch (err) {
      console.error('❌ Error al listar proveedores:', err);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  // Ruta para crear un proveedor + su contacto en una transacción
  router.post('/', async (req, res) => {
    console.log('📥 Petición recibida para crear proveedor:', req.body);

    const { nombre, ubicacion, nit, telefono, correo } = req.body;
    const conn = await pool.getConnection();

    try {
      await conn.beginTransaction();

      // Insertar en proveedor
      const [result] = await conn.execute(
        `INSERT INTO proveedor (id_tipo_proveedor, nombre, ubicacion, nit)
         VALUES (?, ?, ?, ?)`,
        [1, nombre, ubicacion, nit]
      );
      const nuevoIdProveedor = result.insertId;
      console.log('✅ Proveedor insertado con ID:', nuevoIdProveedor);

      // Insertar en contacto_proveedor
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