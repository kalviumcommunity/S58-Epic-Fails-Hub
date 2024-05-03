const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const port = process.env.PUBLIC_PORT || 8080;
const mongoose = require("mongoose");
const { connection } = require("./config/db");
const epicfailshubdata = require("./config/database");
const { epicfailshubModel } = require("./model/epicfailshub");
const CRUD_routes = require("./routes/routes");
const cors = require("cors");
const joi = require("joi");
const { userModel } = require("./model/usersignup");

app.use(express.json());
app.use(cors());
app.use("/routes", CRUD_routes);

const dotenv = require("dotenv");
dotenv.config();

// Module 15
const schema = joi.object({
  username: joi.string().min(3).max(20).required(),
  email: joi.string().email().required(),
  password: joi.string().min(3).max(20).required(),
});

// Module 15
const validateUserInput = (Input) => {
  // console.log(email,password)
  const { error, value } = schema.validate(Input);

  if (error) {
    console.log({ message: "Validation failed", error });
    return false;
  } else {
    console.log("Validation successfull");
    return true;
  }
};

app.get("/", async (req, res) => {
  let message, statusCode;
  try {
    await connection;
    if (mongoose.connection.readyState === 1) {
      message = "Connected to MongoDB";
      statusCode = 200;
      console.log(res);
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

// Module 15
app.post("/signup", async (req, res) => {
  let result = validateUserInput(req.body);

  if (!result) {
    res.send("Invalid data in the request");
    return;
  }

  try {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json({
      msg: "Validation & SignUp done Successfully",
      data: user.toJSON(),
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: "Sign Up Failed", error: e });
  }
});

// Module 15
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the provided email exists in the database
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the password stored in the database
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Password is valid, generate JWT token for authentication
    const secretKey = "Nimish";
    const token = jwt.sign({ userId: user._id }, secretKey);

    // Set the token in a cookie
    res.cookie("token", token, { httpOnly: true });

    res.json({ message: "Logged In Successfully", token });
  } catch (error) {
    console.error("Login failed:", error);
    res.status(500).json({ message: "An error occurred while logging in" });
  }
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
