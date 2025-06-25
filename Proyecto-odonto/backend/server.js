const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

//archivos reados
const loginRoutes = require('./login'); // Importar las rutas del login
const productosRoutes = require('./productos');  
const proveedoresRoutes = require('./proveedores');
const inventarioRoutes = require('./inventario');
const infomaterialRoutes = require('./infomaterial');
const pacientesRoutes = require('./pacientes'); 
const habitosRoutes = require('./habitos'); 
const historialodontoRoutes = require('./historialodonto'); 
const historialmedicoRoutes = require('./historialmedico'); 
const listaPacientesRoutes = require('./listapacientes');
const doctoresRoutes = require('./doctores');
const listadodoctoresRoutes = require('./listadodoctores');
const ingresoDoctorRoutes    = require('./ingresodoctor');
const empleadosRoutes = require('./empleados');
const empleadoinfoRoutes = require('./empleadoinfo');
const agregarempleadoRoutes = require('./agregarempleado');
const citaRoutes = require('./cita');
const listacitaRoutes = require('./listacita'); 
const usuarioRoutes = require('./usuario'); // importar ruta de usuarios
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

async function startServer() {

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',  
  user: process.env.DB_USER || 'sergio',
  password: process.env.DB_PASSWORD || '1234',
  database: process.env.DB_NAME || 'odontologia',
});
  await pool.query('SELECT 1');
  console.log('✅ MySQL pool conectado');

  app.locals.pool = pool;
  // Usar las rutas importadas
  app.use('/api', loginRoutes(pool));  
  app.use('/api', productosRoutes(pool)); 
  app.use('/api/proveedores', proveedoresRoutes(pool));
  app.use('/api/inventario', inventarioRoutes(pool));
  app.use('/api/infomaterial', infomaterialRoutes(pool));
  app.use('/api/ doctores', doctoresRoutes(pool));
  app.use('/api/listadodoctores', listadodoctoresRoutes(pool));
  app.use('/api/ingresodoctor', ingresoDoctorRoutes(pool));
  app.use('/api/inventario', inventarioRoutes(pool));
  app.use('/api/infomaterial', infomaterialRoutes(pool));
  app.use('/api', pacientesRoutes(pool)); 
  app.use('/api/habitos', habitosRoutes(pool)); 
  app.use('/api/historialodonto', historialodontoRoutes(pool)); 
  app.use('/api/historialmedico', historialmedicoRoutes(pool)); 
  app.use('/api/empleados', empleadosRoutes(pool)); 
  app.use('/api/empleadoinfo', empleadoinfoRoutes(pool));
  app.use('/api/agregarempleado', agregarempleadoRoutes(pool)); 
  app.use('/api/cita', citaRoutes(pool));
  app.use('/api/listacita', listacitaRoutes(pool));
  app.use('/api/listapacientes', listaPacientesRoutes(pool));
  app.use('/api/usuarios', usuarioRoutes);
  app.use('/files', express.static(path.join(__dirname, 'files')));

  // Iniciar el servidor
  app.listen(4000, () => console.log('🟢 Servidor en http://localhost:4000'));
}

startServer();