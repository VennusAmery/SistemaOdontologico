const express = require('express');
const router = express.Router();

module.exports = function (pool) {
    
  router.post('/contactos', async (req, res) => {
    const { id_proveedor, telefono, correo } = req.body;

    // Validación base
    if (!id_proveedor || (!telefono && !correo)) {
      return res.status(400).json({ error: 'Debe proporcionar un teléfono o un correo' });
    }

    // Validación de formato de teléfono (solo si se proporciona)
    if (telefono) {
      const phoneRegex = /^[0-9]{8}$/; // O usa {10} si es tu caso
      if (!phoneRegex.test(telefono)) {
        return res.status(400).json({ error: 'El teléfono no tiene un formato válido (ej. 8 dígitos)' });
      }
    }

    // Validación de formato de correo (solo si se proporciona)
    if (correo) {
      const emailRegex = /^\S+@\S+\.\S+$/;
      if (!emailRegex.test(correo)) {
        return res.status(400).json({ error: 'El correo no tiene un formato válido' });
      }
    }

    const conn = await pool.getConnection();
    try {
      await conn.execute(
        `INSERT INTO contacto_proveedor (id_proveedor, telefono, correo)
         VALUES (?, ?, ?)`,
        [id_proveedor, telefono || null, correo || null]
      );
      res.status(201).json({ message: 'Contacto agregado correctamente' });
    } catch (err) {
      console.error('Error al agregar contacto:', err);
      res.status(500).json({ error: 'Error al agregar contacto' });
    } finally {
      conn.release();
    }
  });

  return router;
};
