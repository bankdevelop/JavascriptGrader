const Sequelize = require('sequelize')
const db = require('../database/index')

module.exports = db.sequelize.define(
'exercise',
  {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    category_id: {
        type: Sequelize.INTEGER
    },
    course_id: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    desc: {
        type: Sequelize.STRING
    },
    function_name: {
        type: Sequelize.STRING
    },
    starter_code: {
        type: Sequelize.STRING
    },
    test_case: {
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
