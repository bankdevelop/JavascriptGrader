const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.sequelize.define(
'enrolled',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_id: {
        type: Sequelize.INTEGER,
    },
    student_id: {
        type: Sequelize.INTEGER,
    },
    status: {
        type: Sequelize.BOOLEAN
    }
  },
  {
    freezeTableName: true,
  }
)
