const express = require("express");
// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const chalk = require('chalk');

const app = express();
require('dotenv').config();

const errorMsg = chalk.bgKeyword('white').redBright;
const succesMsg = chalk.bgKeyword('green').white;


var corsOptions = {
  origin: "*"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());  /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));   /* bodyParser.urlencoded() is deprecated */

const db = require("./app/models");
db.mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(succesMsg("Connected to the database!"));
  })
  .catch(err => {
    console.log(errorMsg("Cannot connect to the database!", err));
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

require("./app/routes/turorial.routes")(app);

// set port, listen for requests
//const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT, () => {
  console.log(succesMsg(`Server is running on port ${process.env.PORT}.`));
});
