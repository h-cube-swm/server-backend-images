// Libraries
const express = require("express");
const cors = require("cors");

// Custom modules
const { getResponse: gr, getComment: gc } = require("./utils/response");
const verify = require("./utils/jwt");

const PORT = 80;
const app = express();

// checkJWT
async function checkJWT(req, res, next) {
  req.user = {};
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const verified = await verify(token);
    const payload = JSON.parse(verified.payload.toString());
    req.user = payload;
  } catch (err) {
    console.log("jwt 체크 에러", err);
    res.status(400).send(gc("Only user can upload images"));
    return;
  }
  next();
}

// Global middlewares
app.use(cors());
app.use(checkJWT);

app.get("/", (req, res) => {
  res.status(200).send(gc("Server is running."));
});

// Routers
app.use("/images", require("./routes/image"));

// 404
app.all("*", (req, res) => {
  res.status(404).send(gc("Such endpoint does not exists."));
});

app.listen(PORT, () => {
  console.log(`Server opened at port ${PORT}`);
});
