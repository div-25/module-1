const { Sequelize }= require('sequelize');

const sequelize= require('../database');

const SetDepartment= sequelize.define('cbcs_set_cm_dept',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
});
