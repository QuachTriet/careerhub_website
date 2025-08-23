const { Op } = require("sequelize");
const Jobs = require("../models/Jobs");
const Users = require("../models/Users");
const validator = require("validator");
require("dotenv").config();

//Get List
exports.getList = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12;
        let offset = (page - 1) * limit;
        let title = req.query.title;
        let level = req.query.level;
        let type = req.query.type;
        let location = req.query.location;
        let salary_min = parseFloat(req.query.salary_min);
        let salary_max = parseFloat(req.query.salary_max);

        const whereValues = {};

        if (title) {
            whereValues.title = { [Op.like]: `%${title}%` };
        }

        if (level) {
            whereValues.level = level;
        }

        if (type) {
            whereValues.type = type;
        }

        if (location) {
            whereValues.location = { [Op.like]: `${location}%` };
        }

        if (salary_max && salary_min && salary_max > salary_min) {
            whereValues.salary_min = { [Op.gte]: salary_min };
            whereValues.salary_max = { [Op.lte]: salary_max };
        } else if (salary_min) {
            whereValues.salary_max = { [Op.gte]: salary_min };
        } else if (salary_max) {
            whereValues.salary_min = { [Op.lte]: salary_max };
        }

        const { count, rows } = await Jobs.findAndCountAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            where: whereValues,
        });

        return res.status(200).json({
            total_item: count,
            total_page: Math.ceil(count / limit),
            current_page: page,
            message: "List Jobs",
            result: rows,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
};

//Create Job
exports.createJob = async (req, res) => {
    try {
        const employer_user = req.Users;
        if (!employer_user.id) return res.status(401).json({ errors: { user_id: ["Unauthorized, user id not found!"] } });
        if (employer_user.role != "employer") return res.status(403).json({ errors: { user_role: ["You can't create a job!"] } });
        const { title, description, requirements, location, salary_min, salary_max, type, level } = req.body;

        const newjob = await Jobs.create({
            title,
            description,
            requirements,
            location,
            salary_min,
            salary_max,
            type,
            level,
            employer_id: employer_user.id,
        });

        return res.status(201).json({
            message: "Job created successfully",
            data: newjob,
        });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}

//Update Job
exports.updateJob = async (req, res) => {
    try {
        const employer_user = req.Users;
        if (!employer_user.id) return res.status(401).json({ errors: { user_id: ["Unauthorized, user id not found!"] } });
        if (employer_user.role != "employer") return res.status(403).json({ errors: { user_role: ["You can't create a job!"] } });
        const { title, description, requirements, location, salary_min, salary_max, type, level } = req.body;

        await Jobs.update({
            title,
            description,
            requirements,
            location,
            salary_min,
            salary_max,
            type,
            level
        },
            { where: { id: req.params.id, employer_id: employer_user.id } }
        );

        const updateJob = await Jobs.findByPk(req.params.id, {
            attributes: ['title', 'description', 'requirements', 'location', 'salary_min', 'salary_max', 'type', 'level'],
        });

        return res.status(200).json({
            update_job: updateJob
        })

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}

//Delete Job
exports.deteleJob = async (req, res) => {
    try {
        const employer_user = req.Users;
        if (!employer_user.id) return res.status(401).json({ errors: { user_id: ["Unauthorized, user id not found!"] } });

        const job = await Jobs.findOne({ where: { id: req.params.id } });
        if (!job) return res.status(404).json({ errors: { job: ["This job not found! "] } });
        if (employer_user.id !== job.employer_id) return res.status(403).json({ errors: { user: ["Authorized! You can't deleted this job!"] } })

        await job.destroy();
        return res.status(200).json({ message: "Job deleted successfully!" });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}

// Get Job Detail 
exports.getJob = async (req, res) => {
    try {
        const job_id = req.params.id;

        const detail = await Jobs.findByPk(job_id, {
            attributes: ['title', 'description', 'requirements', 'location', 'salary_min', 'salary_max', 'type', 'level'],
            include: [
                {
                    model: Users,
                    as: 'employer',
                    attributes: ['fullname']
                }
            ]
        })

        return res.status(200).json({
            job_detail: detail
        })

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}