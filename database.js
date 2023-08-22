const { Sequelize } = require('sequelize');

const DB_URL = 'postgres://shubhechchha:JyrzPhQvdrtuJWzZfnypiGSUznxwOnAp@dpg-cji0rpb37aks73f80hj0-a.oregon-postgres.render.com/diaryrecords';

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
