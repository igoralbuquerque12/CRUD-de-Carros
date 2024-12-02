const { DataTypes } = require('sequelize');
const sequelize = require('./db')

const Carro = sequelize.define(
    'Carro', 
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        modelo: {
            type: DataTypes.STRING,
            allowNull: false
        },
        marca: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ano: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        cor: {
            type: DataTypes.STRING,
        },
        numeroPortas: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        quilometragem: {
            type: DataTypes.INTEGER
        }
    },
    {
        tableName: 'carros',
        timestamps: false
    }
)

module.exports = Carro
