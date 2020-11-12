const { Sequelize } = require('sequelize');
const sequelize= new Sequelize('course-offering','root','admin',
{
  dialect: 'mysql',
  host: 'localhost'
});

module.exports= sequelize;