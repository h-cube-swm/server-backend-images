const express = require("express");
const { pool, table } = require("../database/pool");

const upload = require("../utils/upload");
const { getResponse: gr, getComment: gc } = require("../utils/response");

const router = express.Router();

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) return res.status(400).send(gc("'file' field is required."));

    // data for db insert
    const { sid } = req.body;
    const userId = req.user.id;
    const imageUrl = req.file.location;

    // db insert
    const connection = await pool.getConnection(async (conn) => conn);
    try {
      const data = await connection.query(
        `insert into ${table}(survey_id, user_id, file_link) VALUES(?, ?, ?)`,
        [sid, userId, imageUrl]
      );
      console.log("Successfully insert to database", data);
    } catch (err) {
      console.log("Query Error", err);
    } finally {
      connection.release();
    }

    res.status(200).send(gr(imageUrl, "Success"));
  } catch (err) {
    console.log("Fail to get image", err);
    res.status(500).send(gc("Server Error"));
  }
});

module.exports = router;
