require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize('database_name', 'database_user', 'database_password', {
  host: 'localhost',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
