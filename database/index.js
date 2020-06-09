const Sequelize = require('sequelize');
const sequelize = new Sequelize('grader', 'root', '12345678', {
    host: 'localhost',
    dialect: 'mysql'
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;