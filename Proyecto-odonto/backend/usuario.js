// routes/usuarios.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ruta absoluta para carpeta uploads (en tu caso 'files/usuarios')
const uploadDir = path.join(__dirname, '..', 'files', 'usuarios');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

/**Crear usuario con foto*/
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const { usuario, correo } = req.body;
    const foto_url = req.file ? `/files/usuarios/${req.file.filename}` : null;

    if (!usuario || !correo) {
      return res.status(400).json({ error: 'usuario y correo son requeridos' });
    }

    const [result] = await pool.query(
      'INSERT INTO usuarios (usuario, correo, foto_url) VALUES (?, ?, ?)',
      [usuario, correo, foto_url]
    );

    res.status(201).json({
      id: result.insertId,
      usuario,
      correo,
      foto_url,
    });
  } catch (error) {
    console.error('❌ Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

/**Obtener todos los usuarios*/
router.get('/', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const [rows] = await pool.query(
      'SELECT id_usuario AS id, usuario AS usuario, correo, foto_url FROM usuarios ORDER BY usuario ASC'
    );
    res.json(rows);
  } catch (err) {
    console.error('❌ Error al listar usuarios:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

/** Obtener un usuario por su usuario*/
router.get('/:usuario', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const { usuario } = req.params;

    const [rows] = await pool.query(
      'SELECT id_usuario AS id, usuario AS usuario, correo, foto_url FROM usuarios WHERE usuario = ?',
      [usuario]
    );

    if (!rows.length) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error('❌ Error al obtener usuario:', err);
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

module.exports = router;
