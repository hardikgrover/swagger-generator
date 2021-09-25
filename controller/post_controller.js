exports.showIndex = (req, res) => {
  res.send("running node api");
};

const Post = require("../model/post_model");
const Post1 = require("../model/post_model1");

exports.addPost1 = async (req, res) => {
  // console.log(req.body);
  const swaggerDoc1 = {
    serviceName: req.body.serviceName,
    pathName: req.body.pathName,
    method: req.body.method,
    operationId: req.body.operationId,
    description: req.body.description,
    tags: req.body.tags,
    // consumes: req.body.consumes,
    // requestBody: req.body.requestBody,
    // parameters: req.body.parameters,
  };
  if (req.body.requestBody) swaggerDoc1.requestBody = req.body.requestBody;

  if (req.body.parameters) swaggerDoc1.parameters = req.body.parameters;
  console.log(swaggerDoc1);

  try {
    const response = await Post1.findOne({ pathName: req.body.pathName });
    console.log(response);
    if (!response) {
      const post1 = new Post1(swaggerDoc1).save().then((result) => {
        res.json(result);
      });
    } else {
      res.send("updating in progress");
      await Post1.findOneAndUpdate(
        {
          pathName: req.body.pathName,
          // serviceName: req.body.serviceName,
        },
        {
          $set: swaggerDoc1,
          // "paths.$": newPath,
          // paths: newPath,
          // },
        },
        { new: true }
      );
    }
    //   const newPath = {
    //     pathName: req.body.paths[0].pathName,
    //     method: req.body.paths[0].method,
    //     operationId: req.body.paths[0].operationId,
    //     description: req.body.paths[0].description,
    //     tags: req.body.paths[0].tags,
    //     requestBody: req.body.paths[0].requestBody,
    //     parameters: req.body.paths[0].parameters,
    //     // responses: req.body.paths[0].responses,
    //     // security: req.body.paths[0].security,
    //   };
    //   console.log(newPath);
    //   // const result = await response.paths.unshift(newPath);
    //   const result = await Post1.findOne({
    //     "paths.pathName": req.body.paths[0].pathName,
    //   });
    //   if (result) {
    //     await Post1.findOneAndUpdate(
    //       {
    //         "paths.pathName": req.body.paths[0].pathName,
    //         // serviceName: req.body.serviceName,
    //       },
    //       {
    //         $set: {
    //           "paths.$": newPath,
    //           // paths: newPath,
    //         },
    //       },
    //       { new: true }
    //     );
    //   } else {
    //     await Post1.findOneAndUpdate(
    //       {
    //         // "paths.pathName": req.body.paths[0].pathName,
    //         serviceName: req.body.serviceName,
    //       },
    //       {
    //         $addToSet: {
    //           // "paths.$": newPath,
    //           paths: newPath,
    //         },
    //       },
    //       { new: true }
    //     );
    //   }

    //   // await Post1.update({
    //   //   "paths.pathName"
    //   // })

    //   res.send("service already there");

    //   // res.send("done");
    // } else {

    // }
  } catch (e) {
    console.log(e);
  }
};

exports.addPost = (req, res) => {
  // console.log(req.body);

  const swaggerDoc = {
    serviceName: req.body.serviceName,
    paths: req.body.paths,
  };

  const post = new Post(swaggerDoc).save().then((result) => {
    console.log(result);
    res.json(result);
  });

  //     .catch((e) => res.json(e));
  // Post.findOne({serviceName:req.body.serviceName},(err,answer)=>{
  //   if(err){
  //     const post = new Post(swaggerDoc)
  //     .save()
  //     .then((result) => {
  //       console.log(result);
  //       res.json(result);
  //     })

  //     .catch((e) => res.json(e));

  //   }
  //   else{
  //     service={
  //       serviceName:req.body.serviceName
  //     }
  //     Post.findOneAndUpdate(
  //       service,req.body.paths,
  //       {new:true}
  //     )
  //   }
  // })
  // if (req.body.swagger) swaggerDoc.swagger = req.body.swagger;
  // if (req.body.info) {
  //   const info = req.body.info;

  //   const newInfo = {
  //     title: info.title,
  //     description: info.company,
  //     version: info.version,
  //   };
  //   swaggerDoc.info = newInfo;
  // }
  // if (req.body.serviceName) swaggerDoc.serviceName = req.body.serviceName;
  // if (req.body.paths) {
  //   swaggerDoc.paths = req.body.paths;
  // }

  // if (req.body.basePath) swaggerDoc.basePath = req.body.basePath;
  // if (req.body.securityDefinitions)
  //   swaggerDoc.securityDefinitions = req.body.securityDefinitions;
  // console.log(swaggerDoc);
};

exports.getJson = async (req, res) => {
  try {
    const service = await Post1.find({
      serviceName: req.params.serviceName,
    });
    res.send(service);
  } catch (e) {
    res.status(404).json(e);
  }
};

exports.getPost1 = async (req, res) => {
  console.log("entered");

  try {
    const data = await Post.findMany({
      serviceName: req.params.serviceName,
    });
    res.send(data);
  } catch (e) {
    res.status(404).json(e);
  }
};
