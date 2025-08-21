const express = require('express');
const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const authenticated = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) return res.status(401).json({ errors: { token: ["Can't found jwt token user!"] } });

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await Users.findByPk(decode.id);

        if (!user) return res.status(404).json({ errors: { user: ["Can't found user!"] } });

        req.Users = user; //assign user to request

        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
}

module.exports = authenticated;