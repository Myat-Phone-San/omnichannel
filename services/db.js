const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'omichannel',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

console.log('MySQL Pool created!');

module.exports = pool;
