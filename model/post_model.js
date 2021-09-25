const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema = new mongoose.Schema({
  serviceName: {
    type: String,
  },

  paths: {
    type: Map,
    of: {
      type: Map,
      of: new mongoose.Schema({
        operationId: {
          type: String,
        },
        tags: {
          type: Array,
          of: String,
        },
        description: {
          type: String,
        },

        parameters: [
          {
            name: String,
            description: String,
            required: Boolean,
            in: {
              type: String,
              enum: ["query", "formdata", "path"],
            },
            type: {
              type: String,
              enum: ["string", "number"],
            },
          },
        ],
        responses: {},

        security: [
          {
            token: {
              type: Array,
            },
          },
        ],
      }),
    },
  },
});

module.exports = mongoose.model("post", postSchema);
// _id : ObjectId,
// swagger: {string default "2.0.2"}
// info :{
// title: string,
// description: string,
// version:string
// }

// produces:
// {array
// required:false,
// default :"application/json"
// }

// basePath:
// {string,
// defualt:"/api/v1"
// }

// secrutiryDefinitions:
// {
// token:{
// type:string,
// name:string,
// in:header
// }

// }
// methodSchema:{
// type:map,
// of : new Schema {

//         "operationId":  {string}
//         "tags": []
//         "description":string,
//         "parameters": [{
//             "name": string
//             "in": enum ("query","formData","path"...)
//             "description": string,
//             "required": boole ,
//             "type": enum ("string ","number".....)          }
//         ],
//         "responses": {},
//         "security": [{
//           "token": []
//         }]

//     ,

// }
// }
// paths:{
// type:map,
// of :methodSchema
// }

// "paths":{
// "/string(req.path)":{
// "get(reqinformation)":{
// "operationId":"test1"

// "paramaters":[{
//     "name":"paramater1",
//     "description":"this is paramater 1",
//     "in":"query",
//     "type":"string"

// }],
// "responses":{},
// "security":[
//     {
//     "token":[]
//     }
// ]

// }

// }

// }
