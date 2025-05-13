const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'dani',
  password: '1234',
  database: 'ODONTOLOGIA',
});

module.exports = pool;
