const { Sequelize } = require("sequelize"); 
const {sequelize} = require("../server"); 

const TeacherUser = sequelize.define("TeacherUser", {
    id: { 
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    }, 
    username: Sequelize.STRING, 
    password: Sequelize.STRING, 
    name: Sequelize.STRING,
    email: Sequelize.STRING, 
    // locuriDisponibile: {
    //     type: Sequelize.INTEGER,
    //     defaultValue: 20 
    // }
});

module.exports = TeacherUser;