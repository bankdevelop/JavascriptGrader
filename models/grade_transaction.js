const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.sequelize.define(
'grade_transaction',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    exercise_id: {
        type: Sequelize.INTEGER
    },
    student_id: {
        type: Sequelize.INTEGER
    },
    result: {
        type: Sequelize.STRING
    },
    code: {
        type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
  }
)