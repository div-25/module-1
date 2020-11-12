const { Sequelize } = require("sequelize");

const sequelize = require("../database.js");

const CoursesBackup = sequelize.define("cbcs_credit_points_policy_backup", {
    
  course_id: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  course_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  wef: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  mincp: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  maxcp: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  created_by: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  last_updated_by: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  action: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  remarks: {
    type: Sequelize.TEXT,
  },
  status: {
    type: Sequelize.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
});

module.exports = CoursesBackup;
