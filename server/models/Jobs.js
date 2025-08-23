const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");

class Jobs extends Model { };

Jobs.init({
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    requirements: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    salary_min: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
        defaultValue: 0,
    },
    salary_max: {
        type: DataTypes.DECIMAL(15, 2),
        allowNull: false,
    },
    type: {
        type: DataTypes.ENUM("parttime", "fulltime", "freelance"),
        allowNull: false,
        defaultValue: "fulltime",
    },
    level: {
        type: DataTypes.ENUM('fresher', 'junior', 'mid', 'senior', 'lead'),
        allowNull: true,
    },
    employer_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    }
}, {
    sequelize,
    modelName: 'Jobs',
    tableName: 'jobs',
    timestamps: true,
});

Users.hasMany(Jobs, { foreignKey: 'employer_id', as: 'jobs' });
Jobs.belongsTo(Users, { foreignKey: 'employer_id', as: 'employer' });

module.exports = Jobs;
