const Applications = require("../models/Applications");
const validator = require("validator");
const Users = require('../models/Users');
const Jobs = require('../models/Jobs');

exports.getList = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12;
        let offset = (page - 1) * limit;

        if (!page || isNaN(page) || parseInt(page) < 1) {
            return res.status(400).json({
                error: "Missing or invalid 'page' query parameter"
            });
        }

        const { count, rows } = await Applications.findAndCountAll({
            limit: limit,
            offset: offset,
            include: [{ model: Users, as: 'jobseeker' }],
            attributes: { exclude: ['jobseeker_id'] },
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            total_item: count,
            total_page: Math.ceil(count / limit),
            current_page: page,
            message: "Application List",
            result: rows,
        })
    } catch (error) {
        console.error("List application error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}

// Post apply job (jobseeker only)
exports.createApplication = async (req, res) => {
    try {
        const user = req.Users;
        if (!user.id) return res.status(401).json({ errors: { user_id: ["Unauthorized, user id not found!"] } });
        if (user.role !== "jobseeker") return res.status(403).json({ errors: { user_role: ["Authorized! You can't apply this job!"] } });

        const { job_id, cv_url, cover_letter } = req.body;

        const createApp = await Applications.create({
            job_id,
            jobseeker_id: user.id,
            cv_url,
            cover_letter,
        });

        return res.status(201).json({
            message: "Applied successfull!",
            data: createApp,
        });
    } catch (error) {
        console.error("Create application error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}

// Get list of application for user
exports.getListJobseeker = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12;
        let offset = (page - 1) * limit;

        const user = req.Users;
        if (!user.id) return res.status(401).json({ errors: { user_id: ["Unauthorized, user id not found!"] } });
        if (user.role !== "jobseeker") return res.status(403).json({ errors: { user_role: ["Authorized! You can't get this list!"] } });

        const { count, rows } = await Applications.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { jobseeker_id: user.id },
            include: [{ model: Jobs, as: 'job', attributes: ['title', 'level', 'type'] }],
            attributes: { exclude: ['jobseeker_id'] },
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            total_item: count,
            total_page: Math.ceil(count / limit),
            current_page: page,
            message: "Application List By User",
            result: rows,
        })

    } catch (error) {
        console.error("Get list of application for user error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}

//Get application for job
exports.getListByJobs = async (req, res) => {
    try {
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 12;
        let offset = (page - 1) * limit;
        const jobId = req.params.id;

        const user = req.Users;
        if (!user.id) return res.status(401).json({ errors: { user_id: ["Unauthorized, user id not found!"] } });
        if (user.role !== "employer") return res.status(403).json({ errors: { user_role: ["Authorized! You can't get this list!"] } });

        const { count, rows } = await Applications.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { job_id: jobId },
            include: [{ model: Users, as: 'jobseeker', attributes: ['fullName', 'phoneNumber', 'email'] }],
            attributes: { exclude: ['jobseeker_id'] },
            order: [["createdAt", "DESC"]]
        });

        return res.status(200).json({
            total_item: count,
            total_page: Math.ceil(count / limit),
            current_page: page,
            message: "Application List By User",
            result: rows,
        })

    } catch (error) {
        console.error("Get list of application for job error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
}