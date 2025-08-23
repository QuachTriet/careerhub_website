const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const Users = require("./Users");
const Jobs = require("./Jobs");

class Application extends Model { };

Application.init({
    job_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Jobs,
            key: 'id'
        }
    },
    jobseeker_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'id'
        }
    },
    cv_url: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    cover_letter: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    applied_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'Applications',
    tableName: 'applications',
    timestamps: true
});

// Quan hệ
Users.hasMany(Application, { foreignKey: 'jobseeker_id', as: 'applications' });
Application.belongsTo(Users, { foreignKey: 'jobseeker_id', as: 'jobseeker' });

Jobs.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
Application.belongsTo(Jobs, { foreignKey: 'job_id', as: 'job' });

module.exports = Application;
