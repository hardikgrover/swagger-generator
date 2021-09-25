const express = require("express");

const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const loadash = require("lodash");

const utilityFunction = require("./utility/utilityFunction");

const util = require("util");
const func = require("./utility/addSwagger");

// const YAML = require("yamljs");
// const swaggerJsDocs = YAML.load("./api.yaml");
const axios = require("axios");

const app = express();

const port = process.env.PORT || 4000;

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerJsDocs));

let users = [
  { id: 1, name: "hardik grover" },
  { id: 2, name: "superman" },
  { id: 3, name: "vision" },
];
app.use(express.json());
app.get("/string1", (req, res) => {
  utilityFunction("service1", req, app);

  res.status(200).send("this is a string");
});
// app.get("/user", (req, res) => {
//   res.status(200).send({ id: 1, name: "hardik grover" });
// });
app.get("/service1/users", (req, res) => {
  res.status(200).send(users);
  utilityFunction(req, app);
});

app.get("/service1/users/:userId", (req, res) => {
  const obj = users.find((x) => x.id === parseInt(req.params.userId));

  utilityFunction(req, app);
  res.status(200).send(obj);
});
app.get("/service1/user", (req, res) => {
  // console.log(req.query.userId);
  let obj;
  if (req.query.userId) {
    obj = users.find((x) => x.id === parseInt(req.query.userId));
  } else if (req.query.id) {
    obj = users.find((x) => x.id === parseInt(req.query.id));
  }

  utilityFunction(req, app);
  res.status(200).send(obj);
});
app.post("/service1/create/user/", (req, res) => {
  // console.log(typeof req.method);
  // console.log(req.body);
  console.log("hit");
  const add = req.body;
  // console.log(add);
  users.unshift(add);
  // console.log(users);
  res.send(users);
  utilityFunction(req, app);
});

app.delete("/service1/user/delete/:id", (req, res) => {
  const obj = users.filter((x) => x.id != parseInt(req.params.id));
  res.send(obj);
  utilityFunction(req, app);
});

app.put("/service1/user/update", (req, res) => {
  const obj = users.find((x) => x.id === req.body.id);
  obj.name = req.body.name;
  res.send(obj);
  utilityFunction(req, app);
});

func(app);

app.listen(port, () => {
  // const {data}  = axios.get("http://localhost:5000/json")
  console.log(`server listening on port ${port}`);
});
