const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.sequelize.define(
'category',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    course_id: {
        type: Sequelize.INTEGER
    },
    desc: {
        type: Sequelize.STRING
    },
    status: {
        type: Sequelize.BOOLEAN
    },
    create_by: {
        type: Sequelize.INTEGER
    },
    update_by: {
        type: Sequelize.INTEGER
    }
  },
  {
    freezeTableName: true,
  }
)
