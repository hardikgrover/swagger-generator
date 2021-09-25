const axios = require("axios");
const lodash = require("lodash");
const func = require("./addSwagger");
const util = require("util");
const { json } = require("express");

const utilityFunction = async (req, app) => {
  console.log("entered in utility function");
  // console.log(req);

  let params;
  let route = req.route.path;

  let input = "";
  let parameters = [];
  let arr = req.url.split("/");
  arr.shift();
  const serviceName = arr[0];
  let tags = [];

  let requestBody = {};
  let properties = {};

  if (!lodash.isEmpty(req.body)) {
    for (const [key, value] of Object.entries(req.body)) {
      properties = {
        ...properties,
        ...{
          [key]: {
            type: typeof value,
          },
        },
      };
    }
    // console.log(
    //   util.inspect(properties, false, null, true /* enable colors */)
    // );

    // parameters = [
    //   {
    //     in: "body",
    //     name: "user",
    //     description: arr[3],
    //     // content: {
    //     // "application/json": {
    //     // consumes: ["application/json"],
    //     schema: {
    //       type: "object",
    //       // properties: properties,
    //       required: ["id"],
    //       properties: {
    //         id: {
    //           type: "integer",
    //         },
    //         name: {
    //           type: "string",
    //         },
    //       },
    //     },
    //     // },
    //     // },
    //   },
    // ];
    // console.log(properties);

    requestBody = {
      content: {
        "application/json": {
          schema: {
            properties: properties,
            // properties: {
            //   id: {
            //     type: "integer",
            //   },
            //   name: {
            //     type: "string",
            //   },
            // },
          },
        },
      },
    };
  }
  // console.log(util.inspect(requestBody, false, null, true /* enable colors */));

  if (!lodash.isEmpty(req.params)) {
    params = req.params;
    input = "path";
    route = req.route.path.replace(":", "{").concat("}");
  }
  // api/v1/servicename
  else if (!lodash.isEmpty(req.query)) {
    params = req.query;
    input = "query";
    route = req.route.path;
    // arr = req._parsedUrl.pathName.split("/");
  }
  // console.log(util.inspect(params, false, null, true /* enable colors */));

  if (!lodash.isEmpty(params)) {
    // console.log("entered");

    for (const [key, value] of Object.entries(params)) {
      // console.log(`${key}: ${value}`);
      parameters.push({
        name: key,
        description: arr[2],
        required: "false",
        in: input,
        type: typeof value,
      });
    }
  }

  const json1 = {
    serviceName: serviceName,

    pathName: route,
    method: req.method.toLocaleLowerCase(),
    operationId: arr[2],
    description: arr[1] + arr[2],
    tags: arr,
    // consumes: ["application/json"],
    // requestBody: requestBody,

    // parameters: parameters,
  };
  if (!lodash.isEmpty(properties)) json1.requestBody = requestBody;
  if (!lodash.isEmpty(parameters)) json1.parameters = parameters;
  // console.log(util.inspect(json1, false, null, true /* enable colors */));

  try {
    const result = await axios.post("http://localhost:3000/add-post1/", json1);
    // console.log(result);
    console.log("data uploaded");

    func(app);
  } catch (e) {
    console.log(e);
  }

  // console.log(json);

  //   res.status(200).send(users);
};
module.exports = utilityFunction;
// const json = {
//   serviceName: serviceName,
//   paths: {
//     [route]: {
//       [req.method.toLocaleLowerCase()]: {
//         operationId: arr[2],
//         description: arr[1] + arr[2],
//         requestBody: requestBody,

//         parameters: parameters,
//         responses: {},
//         security: [
//           {
//             token: [],
//           },
//         ],
//       },
//     },
//   },
// };
