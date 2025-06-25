// usuarios.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ruta absoluta para carpeta uploads (en tu caso 'files/usuarios')
const uploadDir = path.join(__dirname, 'files', 'usuarios');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuración multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// Ruta POST para crear usuario con foto
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const pool = req.app.locals.pool; // acceso al pool de conexiones MySQL
    const { nombre, username, correo, puesto } = req.body;
    const foto_url = req.file ? `/files/usuarios/${req.file.filename}` : null;

    const [result] = await pool.query(
      'INSERT INTO usuarios (nombre, username, correo, puesto, foto_url) VALUES (?, ?, ?, ?, ?)',
      [nombre, username, correo, puesto, foto_url]
    );

    res.status(201).json({
      id: result.insertId,
      nombre,
      username,
      correo,
      puesto,
      foto_url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
});

// Ruta GET para listar usuarios
router.get('/', async (req, res) => {
  try {
    const pool = req.app.locals.pool;
    const [rows] = await pool.query('SELECT * FROM usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

module.exports = router;
