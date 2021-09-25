const mongoose = require("mongoose");
const schema = mongoose.Schema;

const postSchema1 = new mongoose.Schema(
  {
    serviceName: {
      type: String,
    },

    // paths: [
    // {
    pathName: {
      type: String,
    },
    method: {
      type: String,
    },
    operationId: {
      type: String,
    },
    description: {
      type: String,
    },
    tags: {
      type: Array,
      of: String,
    },
    // consumes: {
    //   type: Array,
    //   of: String,
    // },

    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: Object,
            properties: {
              type: Object,
            },
          },
        },
        // "application/xml": {
        //   schema: {
        //     type: Object,
        //     properties: {
        //       type: Object,
        //     },
        //   },
        // },
        // "application/x-www-form-urlencoded": {
        //   schema: {
        //     type: Object,
        //     properties: {
        //       type: Object,
        //     },
        //   },
        // },
        // "text/plain": {
        //   schema: {
        //     type: Object,
        //     properties: {
        //       type: Object,
        //     },
        //   },
        // },
      },
    },
    parameters: [
      {
        name: String,
        description: String,
        required: {
          type: Boolean,
        },
        in: {
          type: String,
          enum: ["query", "formdata", "path", "body"],
        },
        type: {
          type: String,
          enum: ["string", "number"],
        },

        // schema: {
        //   type: Object,
        //   properties: {
        //     type: Object,
        //   },
        // },
      },
    ],
    responses: {
      type: Object,
      default: {},
    },
    // security: [
    //   {
    //     token: {
    //       type: Array,
    //     },
    //   },
    // ],
  },
  // ],
  // },
  { minimize: false }
);

module.exports = mongoose.model("post1", postSchema1);
