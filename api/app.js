const express = require("express");
require('dotenv').config()

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log("Db is connected");
}).catch(err => console.log(err.message));

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(8000, () => {
  console.log("Port is listening");
});
