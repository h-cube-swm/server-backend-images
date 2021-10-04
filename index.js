// Libraries
const express = require("express");
const cors = require("cors");

// Custom modules
const { getResponse: gr, getComment: gc } = require("./utils/response");

const PORT = 80;
const app = express();

// Global middlewares
app.use(cors());

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
