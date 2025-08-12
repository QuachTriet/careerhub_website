const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('./models/Users');
const validator = require('validator');
require("dotenv").config();

// Login controller
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await Users.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ errors: { username: ["Can't find this username!"] } });
        }

        const isPassword = await bcrypt.compare(password, user.password);
        if (!isPassword) {
            return res.status(401).json({ errors: { password: ["Wrong password! Try again!"] } });
        }

        const accessToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: user.id, role: user.role },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '1d' }
        );

        return res.status(200).json({
            access_token: accessToken,
            refresh_token: refreshToken
        });
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
};

// Register controller
exports.register = async (req, res) => {
    try {
        const { username, password, email, role, fullName } = req.body;

        const user = await Users.findOne({ where: { username } });
        if (user) {
            return res.status(409).json({ errors: { username: ["This username is already taken!"] } });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ errors: { email: ["Invalid email format."] } });
        }

        const emailExists = await Users.findOne({ where: { email } });
        if (emailExists) {
            return res.status(409).json({ errors: { email: ["This email is already registered!"] } });
        }

        if (password.length < 8) {
            return res.status(400).json({ errors: { password: ["Password must be at least 8 characters long."] } });
        }
        if (!/[A-Z]/.test(password)) {
            return res.status(400).json({ errors: { password: ["Password must contain at least one uppercase letter."] } });
        }
        if (!/[a-z]/.test(password)) {
            return res.status(400).json({ errors: { password: ["Password must contain at least one lowercase letter."] } });
        }
        if (!/[0-9]/.test(password)) {
            return res.status(400).json({ errors: { password: ["Password must contain at least one number."] } });
        }
        if (!/[^A-Za-z0-9]/.test(password)) {
            return res.status(400).json({ errors: { password: ["Password must contain at least one special character."] } });
        }

        const hashPass = await bcrypt.hash(password, 10);

        await Users.create({
            username,
            password: hashPass,
            email,
            role: role || "jobseeker",
            fullName,
        });

        return res.status(201).json({
            message: "Registered successfully!"
        });
    } catch (error) {
        console.error("Register error:", error);
        return res.status(500).json({
            message: "Server error, please try again later!"
        });
    }
};
