const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../util/database');

const Emprunt = sequelize.define('Emprunt', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    memberId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Members', // Nom de la table ou du mod�le dans memberservice
            key: 'id',
        }
    },
    livreId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Books', // Nom de la table ou du mod�le dans livreservice
            key: 'id',
        }
    },
    dateEmprunt: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    dateRetour: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

module.exports = Emprunt;
