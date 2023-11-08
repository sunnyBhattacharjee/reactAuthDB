const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const dbConnect = require("./db/dbconnect")

// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

dbConnect()

module.exports = app;
