const mongoose = require("mongoose");
const epicfailshubSchema = mongoose.Schema({
  ID: {type: Number, unique: true, required: true},
  Links: String,
  Captions: String,
});
const epicfailshubModel = mongoose.model("epicfailhub", epicfailshubSchema);

module.exports = { epicfailshubModel };
