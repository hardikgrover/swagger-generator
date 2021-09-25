const express = require("express");
const mongoose = require("mongoose");
const app = express();
const chalk = require("chalk");
const MongoClient = require("mongodb").MongoClient;

const url =
  "mongodb+srv://hardik:hardik@cluster0.bvnla.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// "mongodb://appuser:5eFBAtUr6JKGD6DW@river2.a52p.private:27017/swagger?authSource=admin&readPreference=primary&retryWrites=true&w=majority";
// 'mongodb://admin:admin@192.168.3.214:27017/?authSource=admin&readPreference=primary"

//

const apiRoutes = require("./routes/api_routes");
app.use(express.json());
app.use("/", apiRoutes);

const connectToMongoDb = async () => {
  try {
    mongoose.connect(url, { useNewUrlParser: true }).then(() => {
      console.log("database connected");
      app.listen(3000, () => console.log("listening at port 3000"));
    });
  } catch (e) {
    console.log(e);
  }
};

// const connectToMongoDb = async () => {
//   try {
//     await MongoClient.connect(url, { useNewUrlParser: true })
//       .then((client) => {
//         // app.listen(3000);
//         // console.log("database connected");
//         // Use admin request
//         const connect = client.db("swagger").admin();

//         connect.listDatabases((err, db) => {
//           // Printing the databases
//           if (!err) console.log(db);
//         });
//       })
//       .catch((err) => {
//         // Printing the error message
//         console.log(err.Message);
//       });
//     // let db = null;

//     // const createConnection = () => {
//     // db = mongoose.createConnection(url, {});
//     // return db;
//     // }
//   } catch (e) {
//     console.log(e);
//   }
// };
connectToMongoDb();
// createConnection();
// db.on("connected", function () {
//   console.log(chalk.green("Mongo connected successfully"));
// });

// app.listen(3000, () => {
//   console.log("server started");
// });

// app.listen(3000, console.log("server listening on port 3000"));
// "mongodb://admin:admin@192.168.3.214:27017/?authSource=admin&readPreference=primary"
