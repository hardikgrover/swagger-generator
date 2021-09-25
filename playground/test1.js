const express = require("express");
const func1 = require("./funcTest");

const app = express();

// func1(5);

const a = () => {
  setTimeout(() => {
    console.log("i am function");
  }, 2000);
};
a();

app.get("/get", (req, res) => {
  res.send("hey there");
  console.log("hey there again");
});

app.listen(8000, () => {
  console.log("server listening");
});
