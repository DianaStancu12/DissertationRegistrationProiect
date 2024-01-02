const { Sequelize } = require("sequelize"); 
const {sequelize} = require("../server"); 

const StudentUser = sequelize.define("StudentUser", {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    }, 
    username: Sequelize.STRING, 
    password: Sequelize.STRING,
    name:Sequelize.STRING, 
    email: Sequelize.STRING, 
    teacherId: Sequelize.STRING
});

module.exports = StudentUser;