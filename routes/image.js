const express = require("express");

const upload = require("../utils/upload");
const { getResponse: gr, getComment: gc } = require("../utils/response");

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    // const { surveyId } = req.body;
    if (!req.file)
      return res.status(400).send(gc("image field를 추가해주세요."));

    res.status(200).send(gc("Success"));
  } catch (err) {
    console.log("Fail to get image", err);
    res.status(500).send(gc("Server Error"));
  }
});

module.exports = router;
