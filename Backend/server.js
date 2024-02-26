const express = require("express");
const app = express();
const port = process.env.PUBLIC_PORT || 8080;

app.get("/ping", (req, res) => {
  res.send("pong");
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
