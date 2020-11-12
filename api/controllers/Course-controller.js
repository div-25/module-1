const { v4: uuidv4 } = require("uuid");

const HttpError = require("../models/http-error");
const Courses = require("../models/courses");
const CoursesBackup = require("../models/coursesBackup");

const addCourse = (req, res, next) => {
  console.log(" POST Request in Courses");
  const course_id = req.body.course_id;
  const course_name = req.body.course_name;
  const wef = req.body.wef;
  const mincp = req.body.mincp;
  const maxcp = req.body.maxcp;
  const action = "insert";
  const remarks = req.body.remarks;
  Courses.create({
    course_id: course_id,
    course_name: course_name,
    wef: wef,
    mincp: mincp,
    maxcp: maxcp,
    action: action,
    remarks: remarks,
  })
    .then((course) => {
      console.log("Course Created");
      res.status(201).json({ course: course, message: "Course Created" });
    })
    .catch((err) => {
      console.log(err);
      res.status(201).json("Course Not Created");
    });
};

const getAllCourses = (req, res, next) => {
  console.log(" GET Request in Course");
  Courses.findAll()
    .then((courses) => {
      res.json({ course: courses });
    })
    .catch((err) => {
      console.log("There is some error in displaying courses");
    });
};

const getEditCourseById = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.status(200).json("There is no change in data");
  }
  const courseId = req.params.course_id;
  Courses.findByPk(courseId)
    .then((course) => {
      if (!course) {
        return res.status(404).json("No course is found");
      }
      res.json({ course: course });
    })
    .catch((err) => console.log(err));
};
const postEditCourseById = (req, res, next) => {
  console.log(" PATCH Request in Course");
  const courseId = req.params.course_id;
  const course_name = req.body.course_name;
  const wef = req.body.wef;
  const mincp = req.body.mincp;
  const maxcp = req.body.maxcp;
  const remarks = req.body.remarks;
  Courses.findByPk(courseId)
    .then((course) => {
      course.course_name = course_name;
      course.wef = wef;
      course.mincp = mincp;
      course.maxcp = maxcp;
      course.action = "modify";
      course.remarks = remarks;
      return course.save(); // we are using return to avoid nesting of promises
    })
    .then((result) => {
      //this "then" is for save
      console.log("UPDATED PRODUCT!");
      res.json({ course: result });
    })
    .catch((err) => console.log(err));
};
const deleteCourseById = (req, res, next) => {
  const courseId = req.params.course_id;
  console.log(" DELETE Request in Course");
  Courses.findByPk(courseId)
    .then((course) => {
      return course.destroy();
    })
    .then((result) => {
      return CoursesBackup.create({
        course_id: result.course_id,
        course_name: result.course_name,
        wef: result.wef,
        mincp: result.mincp,
        maxcp: result.maxcp,
        action: "insert",
        remarks: result.remarks,
      });
    })
    .then((result) => {
      console.log("Course Destroyed");
    })
    .catch((err) => {
      console.log(err);
    });

  res.json({ message: "Deleted Course" });
};

exports.addCourse = addCourse;
exports.getEditCourseById = getEditCourseById;
exports.postEditCourseById = postEditCourseById;
exports.deleteCourseById = deleteCourseById;
exports.getAllCourses = getAllCourses;
