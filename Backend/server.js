const express = require("express");
const app = express();
const port = process.env.PUBLIC_PORT || 8080;
const mongoose = require("mongoose");
const { connection } = require("./config/db");

const dotenv = require("dotenv");
dotenv.config();

app.get("/", async (req, res) => {
  let message, statusCode;
  try {
    await connection;
    if (mongoose.connection.readyState === 1) {
      message = "Connected to MongoDB";
      statusCode = 200;
    } else {
      message = "Not connected to MongoDB";
      statusCode = 500;
    }
  } catch (error) {
    console.log("Error connecting to DB");
    console.log(error);
    message = "Error connecting to MongoDB";
    statusCode = 500;
  }
  res
    .status(statusCode)
    .send(`<h1>${message}</h1><p>Status Code: ${statusCode}</p>`);
});

app.get("/ping", (req, res) => {
  res.send("pong");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
