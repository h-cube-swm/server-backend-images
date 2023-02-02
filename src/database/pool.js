const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.IMAGES_DB_HOST,
  user: process.env.IMAGES_DB_USER,
  password: process.env.IMAGES_DB_PASSWORD,
  database: process.env.IMAGES_DB,
});

// for database table
const table = process.env.STAGE === "dev" ? "dev" : "prod";

const sleep = ms => new Promise(r => setTimeout(r, ms));

const dbTest = async () => {
  let connection;
  while (true) {
    try {
      connection = await pool.getConnection(async (conn) => conn);
      console.log("Successfully connected to mysql");
      break;
    } catch (err) {
      console.log("DB Error", err);
    }
    await sleep(100);
  }
  await connection.query(`create table if not exists ${table} (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    survey_id TEXT NOT NULL,
    user_id TEXT NOT NULL,
    file_link TEXT NOT NULL
  )`);
  connection.release();
};

dbTest();

module.exports = { pool, table };
