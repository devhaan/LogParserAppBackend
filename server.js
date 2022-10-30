const express = require("express");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config({ path: "./config.env" });
const PORT = 8000;

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", require("./routes"));


  app.listen(PORT, (req, res) => {
    console.log("server is UP");
  });
