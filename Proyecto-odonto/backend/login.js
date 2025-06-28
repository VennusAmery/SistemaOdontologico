const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();

module.exports = function(pool) {

  // Función para migrar contraseñas en texto plano a hashed
  async function migratePasswords() {
    try {
      const [users] = await pool.query('SELECT id_usuario, password FROM usuarios');
      for (const user of users) {
        // Considera que un hash bcrypt típico tiene al menos 20 caracteres (más o menos)
        if (user.password.length < 20) {
          const hashed = await bcrypt.hash(user.password, 10);
          await pool.query('UPDATE usuarios SET password = ? WHERE id_usuario = ?', [hashed, user.id_usuario]);
          console.log(`🔄 Usuario ${user.id_usuario} migrado a contraseña hasheada.`);
        }
      }
      console.log('✅ Migración de contraseñas completada.');
    } catch (err) {
      console.error('❌ Error en migración de contraseñas:', err);
    }
  }

  // Ejecuta la migración solo una vez al arrancar el módulo
  migratePasswords();

  // Ruta para login
  router.post('/login', async (req, res) => {
    const { usuario, password } = req.body;
  console.log(`📥 Login recibido`);

    try {
      const [rows] = await pool.query(
        'SELECT * FROM usuarios WHERE LOWER(Usuario) = LOWER(?)',
        [usuario]
      );

      if (rows.length === 0) {
        console.log("❌ Usuario no encontrado");
        return res.status(401).json({ message: 'Usuario no encontrado' });
      }

      const user = rows[0];
      console.log("👤 Usuario encontrado");
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        console.log("✅ Login exitoso");
        return res.status(200).json({
          message: 'Login exitoso',
          usuario: user.Usuario,
          nombre: user.Usuario // si no tienes columna nombre, usar Usuario
        });
      } else {
        console.log("❌ Contraseña incorrecta");
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
    } catch (error) {
      console.error('❌ Error al hacer login:', error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  // Ruta para registro
  router.post('/register', async (req, res) => {
    const { usuario, password } = req.body;
    console.log("📥 Registro recibido:", req.body);

    try {
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      await pool.query(
        'INSERT INTO usuarios (Usuario, password) VALUES (?, ?)',
        [usuario, hashedPassword]
      );

      return res.status(201).json({ message: 'Usuario registrado correctamente' });

    } catch (error) {
      console.error('❌ Error al registrar:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  return router;
};
