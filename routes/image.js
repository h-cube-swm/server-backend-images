const express = require("express");
const { getResponse: gr, getComment: gc } = require("../utils/response");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { surveyId } = req.body;

    console.log(req.files.image);
    res.status(200).send(gc("Success"));
  } catch (err) {
    console.log("Fail to get image", err);
    res.status(500).send(gc("Server Error"));
  }
});

module.exports = router;
