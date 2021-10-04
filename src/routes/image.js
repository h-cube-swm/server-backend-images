const express = require("express");

const upload = require("../utils/upload");
const { getResponse: gr, getComment: gc } = require("../utils/response");

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).send(gc("'file' field is required."));

    // db에 insert할 데이터
    const { surveyId } = req.body;
    const userId = req.user.id;

    const imageUrl = req.file.location;
    res.status(200).send(gr(imageUrl, "Success"));
  } catch (err) {
    console.log("Fail to get image", err);
    res.status(500).send(gc("Server Error"));
  }
});

module.exports = router;
