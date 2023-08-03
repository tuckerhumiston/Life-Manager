
const db = require("../db");
const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { SECRET } = require('../constants');

//Make sure users can not access this route. DELETE ME LATER
exports.getUsers = async (req, res) => {
    try {
        const { rows } = await db.query('SELECT id, username, email FROM users')
        return res.status(200).json({
            success: true,
            users: rows
        });
        
    } catch (error) {
        console.log(error.message)
    }
}

//Register user
exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await hash(password, 10);
        await db.query('INSERT INTO users (username, email, password) VALUES ($1, $2, $3)', [username, email, hashedPassword]);
        return res.status(201).json({
            success: true,
            message: 'User created successfully'
        });

    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        });
    }
}

//Login user
exports.login = async (req, res) => {
    let user = req.user;
    payload = {
        id: user.id,
        email: user.email,
    }

    try {
        const token = await sign(payload, SECRET);

        return res.status(200).cookie('token', token, {httpOnly: true}).json({
            success: true,
            message: 'User logged in successfully'
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        });
    }
}

//Logout user
exports.logout = async (req, res) => {
    try {
        return res
        .status(200)
        .clearCookie('token', {httpOnly: true})
        .json({
            success: true,
            message: 'User logged out successfully'
        });
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
            error: error.message
        });
    }
};

//Example to show protected route
exports.protected = async (req, res) => {
    try {
        return res.status(200).json({
            info: 'Protected info'
        });
        
    } catch (error) {
        console.log(error.message)
    }
}