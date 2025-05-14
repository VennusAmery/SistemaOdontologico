const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  // GET /api/infomaterial         → lista todos los productos
  router.get('/', async (req, res) => {
    try {
      const [rows] = await pool.execute(
        `SELECT 
           id_producto   AS id,
           nombre,
           cantidad,
           ingreso,
           vencimiento,
           descripcion,
           monto,
           estado_disponible,
           estado_agotado,
           estado_solicitado,
           estado_pocas_unidades
         FROM producto
         ORDER BY nombre`
      );
      res.json(rows);
    } catch (err) {
      console.error('Error al obtener inventario:', err);
      res.status(500).json({ error: 'No se pudo obtener inventario' });
    }
  });

  // GET /api/infomaterial/:id     → detalle de un producto
  router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      const [rows] = await pool.execute(
        `SELECT 
           id_producto   AS id,
           nombre,
           cantidad,
           ingreso,
           vencimiento,
           descripcion,
           monto,
           estado_disponible,
           estado_agotado,
           estado_solicitado,
           estado_pocas_unidades
         FROM producto
         WHERE id_producto = ?`,
        [id]
      );
      if (!rows.length) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }
      res.json(rows[0]);
    } catch (err) {
      console.error('Error al obtener material:', err);
      res.status(500).json({ error: 'Error al obtener material' });
    }
  });

  // PUT /api/infomaterial/:id     → actualizar producto
  router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const {
      nombre, cantidad, ingreso, vencimiento,
      descripcion, monto,
      estado_disponible, estado_agotado,
      estado_solicitado, estado_pocas_unidades
    } = req.body;
    try {
      await pool.execute(
        `UPDATE producto
           SET nombre = ?, cantidad = ?, ingreso = ?, vencimiento = ?,
               descripcion = ?, monto = ?,
               estado_disponible = ?, estado_agotado = ?,
               estado_solicitado = ?, estado_pocas_unidades = ?
         WHERE id_producto = ?`,
        [
          nombre, cantidad, ingreso, vencimiento,
          descripcion, monto,
          estado_disponible, estado_agotado,
          estado_solicitado, estado_pocas_unidades,
          id
        ]
      );
      res.json({ message: 'Actualizado correctamente' });
    } catch (err) {
      console.error('Error al actualizar material:', err);
      res.status(500).json({ error: 'Error al actualizar material' });
    }
  });

  // DELETE /api/infomaterial/:id  → eliminar producto
  router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
      await pool.execute(
        `DELETE FROM producto WHERE id_producto = ?`,
        [id]
      );
      res.json({ message: 'Eliminado correctamente' });
    } catch (err) {
      console.error('Error al eliminar material:', err);
      res.status(500).json({ error: 'Error al eliminar material' });
    }
  });

  return router;
};