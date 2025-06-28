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
    try {
      const [rows] = await pool.query(
        'SELECT id_usuario, Usuario AS usuario, password, correo FROM usuarios WHERE LOWER(Usuario)=LOWER(?)',
        [usuario]
      );
      if (!rows.length) return res.status(401).json({ error: 'Usuario no encontrado' });

      const user = rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Contraseña incorrecta' });

      // ✅ Guardamos en la sesión:
      req.session.userId = user.id_usuario;

      // Devolvemos datos mínimos:
      res.json({
        id:     user.id_usuario,
        usuario: user.usuario,
        correo:  user.correo
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.post('/logout', (req, res) => {
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      res.json({ message: 'Desconectado' });
    });
  });
  return router;
};
