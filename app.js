//let's first require all the dependencies
const express = require("express");
const express_handlebar = require("express-handlebars");
const routes = require("./server/routes/employee");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use(express.static("public"));

const handlebars = express_handlebar.create({ extname: ".hbs" });
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

app.use("/", routes);
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
