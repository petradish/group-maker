const Sequelize = require('sequelize');
const db = require('../db');

const Project = db.define('project', {
  name: {
    type: Sequelize.STRING
  },
  numStudents: {
      type: Sequelize.INTEGER,
      validate: {
          max: 4
      }
  }
});

module.exports = Project;
