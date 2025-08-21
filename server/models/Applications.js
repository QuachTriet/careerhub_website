const { Model, DataTypes } = require("sequelize");
const sequelize = require("../configs/database");
const User = require("./User");
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
            model: User,
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
User.hasMany(Application, { foreignKey: 'jobseeker_id', as: 'applications' });
Application.belongsTo(User, { foreignKey: 'jobseeker_id', as: 'jobseeker' });

Jobs.hasMany(Application, { foreignKey: 'job_id', as: 'applications' });
Application.belongsTo(Jobs, { foreignKey: 'job_id', as: 'job' });

module.exports = Application;
