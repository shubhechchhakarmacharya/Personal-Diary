const {DataTypes} =require('sequelize')
const sequelize = require('../database')

const Diary = sequelize.define('DiaryRecords',{
    date:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    day:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    title:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    content:{
        type:DataTypes.STRING,
        allowNull:false,
    },

});

module.exports=Diary;