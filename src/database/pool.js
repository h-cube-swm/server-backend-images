const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.IMAGES_DB_HOST,
  user: process.env.IMAGES_DB_USER,
  password: process.env.IMAGES_DB_PASSWORD,
  database: process.env.IMAGES_DB,
});

module.exports = pool;
