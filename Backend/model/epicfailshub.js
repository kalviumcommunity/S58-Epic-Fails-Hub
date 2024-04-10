const mongoose = require("mongoose");
const epicfailshubSchema = mongoose.Schema({
  ID: Number,
  Links: String,
  Captions: String,
});
const epicfailshubModel = mongoose.model("epicfailshub", epicfailshubSchema);

module.exports = { epicfailshubModel };
