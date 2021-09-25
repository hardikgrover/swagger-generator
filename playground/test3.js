const data = {
  openapi: "3.0.0",
  info: {
    title: "user",
    description: "user document",
    version: "1.0",
    contact: { email: "groverhardik18@gmail.com" },
    liscence: { name: "Apache 2.0", url: "http:/apache.org/" },
  },
  paths: {
    "/service1/create/user/": {
      post: {
        operationId: "user",
        description: "createuser",
        consumes: ["application/json"],
        requestBody: { content: { "application/json": {} } },
        parameters: [
          {
            name: "user",
            description: "user",
            in: "body",
            schema: {
              type: "object",
              required: ["id"],
              properties: { id: { type: "integer" }, name: { type: "string" } },
            },
          },
        ],
        responses: {},
      },
    },
  },
};
