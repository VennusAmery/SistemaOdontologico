// productos.js
const express = require('express');  
const router = express.Router();  

module.exports = function(pool) {
  // Ruta para crear un producto
  router.post('/productos', async (req, res) => {
    console.log('📥 req.body:', req.body);

    const {
      nombre, cantidad, ingreso, vencimiento,
      id_proveedor, id_clinica, monto, descripcion,
      estado_disponible, estado_agotado,
      estado_solicitado, estado_pocas_unidades
    } = req.body;

    const sql = `
      INSERT INTO producto (
        nombre, cantidad, ingreso, vencimiento,
        id_proveedor, id_clinica, monto, descripcion,
        estado_disponible, estado_agotado, 
        estado_solicitado, estado_pocas_unidades
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const params = [
      nombre,
      cantidad,
      ingreso,
      vencimiento,
      id_proveedor || null,
      id_clinica   || null,
      monto,
      descripcion,
      estado_disponible ? 1 : 0,
      estado_agotado    ? 1 : 0,
      estado_solicitado ? 1 : 0,
      estado_pocas_unidades ? 1 : 0
    ];

    try {
      const [result] = await pool.execute(sql, params);
      console.log('✅ InsertId:', result.insertId);
      return res.status(201).json({ insertId: result.insertId });
    } catch (err) {
      console.error('❌ Error al insertar producto:', err.message);
      return res.status(500).json({ error: err.message });
    }
  });

  return router;
};
