const mongoose = require("mongoose");
const epicfailshubSchema = mongoose.Schema({
  ID: Number,
  Links: String,
  Captions: String,
});
const epicfailshubModel = mongoose.model("epicfailhub", epicfailshubSchema);

module.exports = { epicfailshubModel };
