const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();  // Aquí se define el enrutador

// ✅ Pool global (NO dentro de ninguna función)
const pool = mysql.createPool({
  host: 'localhost',
  user: 'dani',
  password: '1234',
  database: 'ODONTOLOGIA',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// GET /api/clinica/:id
router.get('/:id', async (req, res) => {
  const clinicaId = req.params.id;
  try {
    const [rows] = await pool.query('SELECT * FROM clinicas WHERE id = ?', [clinicaId]);
    const clinica = rows[0];  // Obtener el primer resultado
    if (clinica) {
      res.json(clinica);
    } else {
      res.status(404).json({ error: 'Clínica no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener clínica' });
  }
});

// PUT /api/clinicas/:id
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, direccion, telefono } = req.body;

  try {
    const [result] = await pool.execute(
      'UPDATE clinicas SET nombre = ?, direccion = ?, telefono = ? WHERE id = ?',
      [nombre, direccion, telefono, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Clínica no encontrada' });
    }

    res.json({ message: 'Clínica actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar clínica' });
  }
});

module.exports = router;
