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
  const checkID = await epicfailshubModel.findOne({
    ID: req.body.ID,
  });
  if (checkID) {
    return res.status(400).send("ID already exists");
  }
  const { ID, Links, Captions } = req.body;
  let payload = { ID, Links, Captions };

  console.log(payload);
  try {
    const result = await epicfailshubModel.create(payload);
    res.send({ message: "epicfailshub created successfully", result });
  } catch (error) {
    res.send("Error " + error);
  }
});

CRUD_routes.put("/Update/:id", async (req, res) => {
  try {
    const frontEndID = req.params.id;
    const { Links, Captions } = req.body;

    // Check if the post with the given ID exists
    const existingPost = await epicfailshubModel.findOne({ ID: frontEndID });
    if (!existingPost) {
      return res.status(400).send("Post with the provided ID does not exist");
    }

    // Update the post
    const updatedPost = await epicfailshubModel.findOneAndUpdate(
      { ID: frontEndID },
      { Links, Captions },
      { new: true } // Return the updated document
    );

    if (!updatedPost) {
      return res.status(500).send("Failed to update post");
    }

    return res.json({ message: "Post updated successfully", updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return res.status(500).send("An error occurred while updating the post");
  }
});

CRUD_routes.delete("/Delete/:id", async (req, res) => {
  try {
    const frontEndID = req.params.id;

    // Check if the post with the given ID exists
    const existingPost = await epicfailshubModel.findOne({ ID: frontEndID });
    if (!existingPost) {
      return res.status(404).send("Post with the provided ID does not exist");
    }

    // Delete the post
    const deletedPost = await epicfailshubModel.findOneAndDelete({
      ID: frontEndID,
    });

    if (!deletedPost) {
      return res.status(500).send("Failed to delete post");
    }

    return res.json({ message: "Post deleted successfully", deletedPost });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.status(500).send("An error occurred while deleting the post");
  }
});

module.exports = CRUD_routes;
