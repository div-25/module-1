const express = require("express");

const courseController = require("../controllers/Course-controller");

const router = express.Router();

router.get("/", courseController.getAllCourses);
router.post("/", courseController.addCourse);
router.get("/:course_id", courseController.getEditCourseById);
router.patch("/:course_id", courseController.postEditCourseById);
router.delete("/:course_id", courseController.deleteCourseById);

module.exports = router;
