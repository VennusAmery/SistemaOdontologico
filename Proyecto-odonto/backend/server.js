const express = require('express');
const mysql = require('mysql');

// Crea la conexión a la base de datos
const db = mysql.createConnection({
  host: 'localhost', //nombre del servidor
  user: 'root', // su usuario de mysql
  password: '1234',  //tu contraseña real
  database: 'ODONTOLOGIA'  //El nombre de tu base de datos
});

// Conectar a la base de datos
db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

const app = express();
const PORT = 3006;

// Ruta de ejemplo para obtener datos de la base de datos
app.get('/api/odontologia', (req, res) => {
  const sql = 'SELECT * FROM ODONTOLOGIA';  // Cambia el nombre de la tabla si es necesario
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error en la consulta:', err);
      res.status(500).send('Error en la consulta');
      return;
    }
    res.json(results);
  });
});

// Escuchar en el puerto
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
