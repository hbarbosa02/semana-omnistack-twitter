const express = require("express");

const app = express();

app.get("/", (req, res) => {
  return res.send("Hello World");
});

app.listen(4000, () => {
  console.log("Server started on port 4000");
});
