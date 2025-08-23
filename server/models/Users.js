const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/database");

class User extends Model {};

User.init({
    username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    fullName: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    role: {
        type: DataTypes.ENUM('jobseeker', 'employer', 'admin'),
        allowNull: false,
        defaultValue: 'jobseeker'
    },
    phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true
    },
    avatar: {
        type: DataTypes.STRING(255),
        allowNull: true
    }
}, {
    sequelize,
    modelName: "Users",
    tableName: "users",
    timestamps: true
});

module.exports = User;
