const { Sequelize } = require('sequelize');

const DB_URL = 'postgres://diary_413u_user:QpWWubrSE9osvnp79DYTaxfbKyKOpCLd@dpg-cjimhu7jbvhs73a7q79g-a.singapore-postgres.render.com/diary_413u';

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
module.exports = sequelize;
