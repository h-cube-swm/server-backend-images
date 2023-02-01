const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.IMAGES_DB_HOST,
  user: process.env.IMAGES_DB_USER,
  password: process.env.IMAGES_DB_PASSWORD,
  database: process.env.IMAGES_DB,
});

const sleep = ms => new Promise(r => setTimeout(r, ms));

const dbTest = async () => {
  while (true) {
    try {
      await pool.getConnection(async (conn) => conn);
      console.log("Successfully connected to mysql");
      break;
    } catch (err) {
      console.log("DB Error", err);
    }
    await sleep(100);
  }
};

dbTest();

module.exports = pool;
