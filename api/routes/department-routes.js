const express = require("express");

const departmentController = require("../controllers/Department-controller.js");

const router = express.Router();

router.get("/", departmentController.getDepartments);

module.exports=router;