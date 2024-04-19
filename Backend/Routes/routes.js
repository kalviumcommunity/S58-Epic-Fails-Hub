const express = require("express");
const { epicfailshubModel } = require("../model/epicfailshub");
const CRUD_routes = express.Router();
const epicfailshubdata = require("../config/database");

CRUD_routes.get("/", async (req, res) => {
  try {
    const epicfailshub = await epicfailshubModel.find();
    // console.log(epicfailshub)
    res.json(epicfailshub);
  } catch (err) {
    console.log(err);
    res.send({ Error: err });
  }
});

CRUD_routes.post("/Create", async (req, res) => {
  const { ID, Links, Captions } = req.body;
  let payload = { ID, Links, Captions };

  console.log(payload);
  try {
    // const newepicfailshub = new epicfailshubModel(payload);
    // await newepicfailshub.save();
    const result = await epicfailshubModel.create(payload);
    // await epicfailshubModel.create(payload)
    // console.log(newepicfailshub, payload);
    res.send({ message: "epicfailshub created successfully", result });
  } catch (error) {
    res.send("Error " + error);
  }
});

CRUD_routes.put("/Update/:id", async (req, res) => {
  let id = req.params.id;
  let payload = req.body;
  try {
    const epicfailshub = await epicfailshubModel.findByIdAndUpdate(id, payload);
    res.json({ message: "epicfailshub updated successfully" });
  } catch (error) {
    res.send("Error " + error);
  }
});

CRUD_routes.delete("/Delete/:id", async (req, res) => {
  let id = req.params.id;
  try {
    const epicfailshub = await epicfailshubModel.findByIdAndDelete(id);
    res.json({ message: "epicfailshub deleted successfully" });
  } catch (error) {
    res.send("Error " + error);
  }
});

module.exports = CRUD_routes; 
