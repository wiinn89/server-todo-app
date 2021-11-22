const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

require('dotenv').config();

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL;//dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);

module.exports = db;
