const express = require("express");
const axios = require("axios");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();
let result;

const func = async () => {
  const { data } = await axios.get(
    "http://localhost:3000/get-json/6130d13d52fa8ee20883e72b"
  );

  const options = {
    definition: data,
    apis: ["test.js"],
  };

  const swaggerDocs = swaggerJsDoc(options);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
func();

app.listen(7000, () => {
  console.log("server listening on port 7000");
});

// console.log(data);
// const data = {
//   openapi: "3.0.0",
//   info: {
//     title: "Thifs is my swagger ui docs",
//     description: "This is my company documentation made by me",
//     contact: {
//       email: "groverhardik18@gmail.com",
//     },
//     liscence: {
//       name: "Apache 2.0",
//       url: "http:/apache.org/",
//     },
//     version: "",
//   },
//   paths: {
//     "/string": {
//       get: {
//         summary: "Returns a string",
//         description: "It is just returning a fake string",
//         responses: {
//           200: {
//             description: "succsess",
//             content: {
//               "*/*": {
//                 schema: {
//                   type: "string",
//                   example: "a fake string",
//                 },
//               },
//             },
//           },
//           400: {
//             description: "user error",
//           },
//           500: {
//             description: "internal server error",
//           },
//         },
//       },
//     },
//     "/user": {
//       get: {
//         summary: "returns a single object",
//         description: "returning a object",
//         responses: {
//           200: {
//             description: "success",
//             content: {
//               "*/*": {
//                 schema: {
//                   type: "object",
//                   properties: {
//                     id: {
//                       type: "integer",
//                     },
//                     name: {
//                       type: "string",
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/users": {
//       get: {
//         summary: "returns array of users",
//         description: "array return",
//         responses: {
//           200: {
//             description: "success",
//             content: {
//               "*/*": {
//                 schema: {
//                   type: "array",
//                   items: {
//                     type: "object",
//                     properites: {
//                       id: {
//                         type: "integer",
//                       },
//                       name: {
//                         type: "string",
//                       },
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//     "/users/{userId}": {
//       get: {
//         summary: "return array of users",
//         description: "array return",
//         parameters: [
//           {
//             name: "userId",
//             in: "path",
//             required: true,
//             schema: {
//               type: "string",
//             },
//           },
//         ],
//         responses: {
//           200: {
//             description: "success",
//           },
//         },
//       },
//     },
//   },
// };
// const options = {
//   definition: data,
//   apis: ["test.js"],
// };
// const swaggerDocs = swaggerJsDoc(options);

// app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// setTimeout(() => {
// console.log(result);
// }, 2000);
// axios
//   .get("http://localhost:3000/get-json/61308a6e06add5f4a9b120f8")
//   .then(({ data }) => {
//     // console.log(data);
//     const options = {
//       definition: data,
//       apis: ["test.js"],
//     };
//     const swaggerDocs = swaggerJsDoc(options);

//     app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
//   })
//   .then((data) => {
//     result = data;
//   })
//   .catch((e) => console.log(e));

// const options = {
//   definition: data,
//   apis: ["test.js"],
// };

// console.log(data);
