const express = require("express");
const app = express();
const port = process.env.PUBLIC_PORT || 8080;
const mongoose = require("mongoose");
const { connection } = require("./config/db");
const epicfailshubdata = require("./config/database");
const { epicfailshubModel } = require("./model/epicfailshub");
const CRUD_routes = require("./Routes/routes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/routes", CRUD_routes);

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

app.post("/postdata", (req, res) => {
  epicfailshubModel
    .insertMany(epicfailshubdata)
    .then((result) => {
      console.log("Inserted", result.length, "documents into the collection");
      res.status(200).send("Data inserted successfully");
    })
    .catch((error) => {
      console.error("Error inserting documents:", error);
      res.status(500).send("Failed to insert data");
    });
});
