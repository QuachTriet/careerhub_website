const express = require("express");
const app = express();

const db = require("./configs/database");


app.get("/", (req, res) => {
  res.send("Hello Express!");
});

app.listen(3000, () => {
  console.log("Server chạy ở http://localhost:3000");
});