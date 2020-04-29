const Sequelize = require('sequelize');
const sequelize = new Sequelize('autograder', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;