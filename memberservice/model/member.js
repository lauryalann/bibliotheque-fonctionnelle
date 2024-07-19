const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Member = sequelize.define('Member', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nom: {
        type: DataTypes.STRING,
        allowNull: false
    },
    adresse: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telephone: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Member;