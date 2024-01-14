const { Sequelize } = require("sequelize"); 
const {sequelize} = require("../server"); 

const Request = sequelize.define("Request", {
    id: {
        type: Sequelize.INTEGER, 
        primaryKey: true, 
        autoIncrement: true, 
    },
    studentId: Sequelize.INTEGER,
    teacherId: Sequelize.INTEGER,
    thesisTitle: Sequelize.STRING,
    statusRequest: Sequelize.BOOLEAN,
    reasonReject: Sequelize.STRING
}
);

module.exports = Request;