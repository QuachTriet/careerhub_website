const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const User = require("./User");

class Setting extends Model { };

Setting.init({
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    },
    language: {
        type: DataTypes.ENUM('en', 'vi', 'jp'),
        allowNull: false,
        defaultValue: 'en'
    },
    theme: {
        type: DataTypes.ENUM('light', 'dark'),
        allowNull: false,
        defaultValue: 'light'
    },
    notifications: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }
}, {
    sequelize,
    modelName: 'Setting',
    tableName: 'settings',
    timestamps: true
});

// Quan hệ
User.hasOne(Setting, { foreignKey: 'user_id', as: 'setting' });
Setting.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = Setting;
