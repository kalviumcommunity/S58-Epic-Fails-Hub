const mongoose = require("mongoose");
const epicfailshubSchema = mongoose.Schema({
  ID: { type: Number, unique: true, required: true },
  Links: { type: String, required: true },
  Captions: { type: String, required: true },
  Created_By: { type: String, required: true },
});
const epicfailshubModel = mongoose.model("epicfailhubs", epicfailshubSchema);

module.exports = { epicfailshubModel };
