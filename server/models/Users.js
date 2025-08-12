const { Sequelize, DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Users extends Model { }

Users.init({
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'employer', 'jobseeker'),
        allowNull: false,
        defaultValue: 'jobseeker',
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: true,
});

module.exports = Users;
