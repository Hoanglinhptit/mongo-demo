const MongoClient = require("mongodb").MongoClient;
const configDB = require("../config/db");
const { port } = require("../config/express");
const Express = require("express");
const cors = require("cors");
const path = require("path");
const route = require('../route')
process.app = app = {};
app.configDB = configDB;

module.exports.startApp = async function (callback) {
  try {
    initComponent();
    await startDb();
    await startWeb();
    callback();
  } catch (e) {
    console.error(e);
  }
};

function initComponent() {
  app.BaseModel = require("./baseModel");
}

async function startDb() {
  return new Promise((resolve, reject) => {
    const uri = configDB.uri;
    const client = new MongoClient(uri);

    client
      .connect()
      .then(() => {
        console.log("connect to db success");
        const db = client.db(configDB.database);
        app.db = db;
        resolve();
      })
      .catch((err) => {
        console.log("connect to db failed");
        reject(err);
      });
  });
}

async function startWeb() {
  return new Promise((resolve, reject) => {
    const express = Express(); // gan cho express 1 object
    app.express = express; // tham chieu gia tri bien express cho app. bien a thanh bien toan cuc
    express.use(cors());

    // express.set("view engine", "ejs");
    // express.set("views", path.join(__dirname, '..',"views"));

    express.use(Express.static("./static"));
    express.use(Express.urlencoded({ extended: true }));
    express.use(Express.json());

    route(express);
    const server = express.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
    resolve(server);
  });
}
