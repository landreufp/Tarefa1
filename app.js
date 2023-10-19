const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users'); 
const catalogRouter = require('./routes/catalog'); 

mongoose.set("strictQuery", false);
const mongoDB = "mongodb://127.0.0.1/projectdb";

const Schema = new mongoose.Schema({
  a_string: String,
  a_date: Date,
});

const Model = mongoose.model("Model", Schema);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/catalog", catalogRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

function closeMongooseConnection() {
  mongoose.connection.close();
}

async function main() {
  await mongoose.connect(mongoDB);
}

module.exports = app;
module.exports.closeMongooseConnection = closeMongooseConnection;

main().catch((err) => console.log(err));
