const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');


const loginRoutes = require('./login'); // Importar las rutas del login
const productosRoutes = require('./productos');  
const proveedoresRoutes = require('./proveedores');
const inventarioRoutes = require('./inventario');
const infomaterialRoutes = require('./infomaterial');
const pacientesRoutes = require('./pacientes'); // Nueva ruta
const habitosRoutes = require('./habitos'); 
const historialodontoRoutes = require('./historialodonto'); 
const historialmedicoRoutes = require('./historialmedico'); 


const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {
  // Crear pool de conexiones MySQL
  const pool = mysql.createPool({
    host: 'localhost',
    user: 'dani',
    password: '1234',
    database: 'ODONTOLOGIA',
  });

  await pool.query('SELECT 1');
  console.log('✅ MySQL pool conectado');

  // Establecer el pool de conexión en app.locals para usarlo en las rutas
  app.locals.pool = pool;
  // Usar las rutas importadas
  app.use('/api', loginRoutes(pool));  
  app.use('/api', productosRoutes(pool)); 
  app.use('/api/proveedores', proveedoresRoutes(pool));

    app.use('/api/inventario', inventarioRoutes(pool));
    app.use('/api/infomaterial', infomaterialRoutes(pool));

  app.use('/api', pacientesRoutes(pool)); // Ruta para pacientes
  app.use('/api/habitos', habitosRoutes(pool)); 
  app.use('/api/historialodonto', historialodontoRoutes(pool)); 
  app.use('/api/historialmedico', historialmedicoRoutes(pool)); 


  // Iniciar el servidor
  app.listen(4000, () => console.log('🟢 Servidor en http://localhost:4000'));
}

startServer();

