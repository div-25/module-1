
const Departments =require("../models/departments");
const HttpError = require("../models/http-error");

const getDepartments = (req, res, next) => {
    console.log(" GET Request in Departments");
    Departments.findAll()
      .then((departments) => {
        res.json({ departments: departments });
      })
      .catch((err) => {
        console.log("There is some error in displaying departments");
      });
  
  };
  

exports.getDepartments=getDepartments;