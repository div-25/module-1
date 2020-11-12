const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpError = require("./models/http-error");
const courseRouter = require("./routes/course-routes");
const departmentRouter= require("./routes/department-routes");
const sequelize = require("./database");

const app = express();

app.use(bodyParser.json());
app.use(cors({
  credentials: true,
}));

// Module 1
app.use("/api/course", courseRouter); // => api/course/.....
app.use("/api/department", departmentRouter);   // => api/department/.....

// Invalid Route
app.use((req, res, next) => {
  const error = new HttpError("Could not find this route");
  next(error);
});

// Error Handling Middleware
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occured" });
});

var port = process.env.PORT || 5000;

sequelize.sync() //syncs the model to the database by creating appropriate table
  .then(result => {
    // console.log(result);
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });
