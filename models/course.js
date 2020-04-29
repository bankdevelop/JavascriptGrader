const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.sequelize.define(
'course',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING
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
