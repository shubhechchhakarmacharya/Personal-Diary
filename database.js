const { Sequelize } = require('sequelize');

const DB_URL = '';

const sequelize = new Sequelize(DB_URL,{
  dialect: 'postgres',
  logging: 'false',
  dialectOptions:{
    ssl:{
      require: true,
      rejectUnauthorized: false,
    },
  },
});
module.exports = sequlize;
