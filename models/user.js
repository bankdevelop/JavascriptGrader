const Sequelize = require('sequelize')
const db = require('../database/index.js')

module.exports = db.sequelize.define(
'user',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    email: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    rank: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
  }
)
