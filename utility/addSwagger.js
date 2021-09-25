const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const loadash = require("lodash");
const util = require("util");
const axios = require("axios");
const fs = require("fs");
// const path = require("../test/test8.json");

const constData = {
  openapi: "3.0.0",
  info: {
    title: "user",
    description: "user document",
    version: "1.0",
    contact: {
      email: "groverhardik18@gmail.com",
    },
  },
};

const func = async (app) => {
  // console.log("entered in add swagger");
  const { data } = await axios.get(`http://localhost:3000/get-json/service1`);
  // const x = {
  //   swagger: "2.0.0",
  //   info: {
  //     title: "defaultTitle",
  //     description: "defaultDescription",
  //     version: "0.1",
  //   },
  //   servers: [
  //     {
  //       url: "http://localhost:4000",
  //     },
  //   ],
  //   paths: {
  //     "/service1/create/user": {
  //       post: {
  //         summary: "Creates a new user.",
  //         consumes: ["application/json"],
  //         parameters: [
  //           {
  //             in: "body",
  //             name: "user",
  //             description: "The user to create.",
  //             schema: {
  //               type: "object",
  //               required: ["userName"],
  //               properties: {
  //                 id: {
  //                   type: "integer",
  //                 },
  //                 name: {
  //                   type: "string",
  //                 },
  //               },
  //             },
  //           },
  //         ],
  //         responses: {
  //           201: {
  //             description: "Created",
  //           },
  //         },
  //       },
  //     },
  //   },
  // };

  // console.log(util.inspect(data, false, null, true /* enable colors */));
  let swaggerData = {};

  if (!loadash.isEmpty(data)) {
    // delete data["_id"];
    // delete data["__v"];
    // delete data.paths[0]._id;
    // if (data.paths[0].parameters[0]) {
    //   // data.paths[0].parameters.map((param)={

    //   // })

    //   delete data.paths[0].parameters[0]._id;
    // }

    // delete data.serviceName;

    // delete data.security["_id"];
    // delete data.parameters["_id"];
    // console.log( data);

    swaggerData = {
      // serviceName: data.serviceName,
      paths: {},
    };
    // console.log(swaggerData);

    data.map((path) => {
      // delete path.parameters[0]._id;
      swaggerData.paths = {
        ...swaggerData.paths,
        ...{
          [path.pathName]: {
            [path.method]: {
              operationId: path.operationId,
              description: path.description,
              // consumes: path.consumes,
              requestBody: path.requestBody,
              parameters: path.parameters,
              responses: path.responses,

              // security: path.security,
            },
          },
        },
      };
    });
    // console.log(
    //   util.inspect(swaggerData, false, null, true /* enable colors */)
    // );
  }
  const finalData = {
    ...constData,
    ...swaggerData,
  };

  // console.log(util.inspect(finalData, false, null, true /* enable colors */));

  const options = {
    definition: finalData,
    apis: ["test.js"],
  };

  const swaggerDocs = swaggerJsDoc(options);
  console.log(util.inspect(swaggerDocs, false, null, true /* enable colors */));
  // fs.writeFileSync("test8.json", JSON.stringify(swaggerDocs));

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

module.exports = func;
