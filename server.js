const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const PORT = process.env.PORT || 8000;

const app = express();


app.use("/", require("./routes"));


  app.listen(PORT, (req, res) => {
    console.log("server is UP");
  });
