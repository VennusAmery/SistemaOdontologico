const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: 'localhost',
  user: 'sergio',
  password: '1234',
  database: 'odontologia',
});

module.exports = pool;
