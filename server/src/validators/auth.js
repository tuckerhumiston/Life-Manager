const { check } = require('express-validator');
const db = require('../db');
const { compare } = require('bcryptjs');

//Check password
const password = check('password')
    .isLength({ min: 6, max: 15})
    .withMessage('Password must be between 6 and 15 characters');

//check email
const email = check('email')
    .isEmail()
    .withMessage('Please enter a valid email address');

//check if email exisits
const emailExists = check('email').custom(async (value) => {
    const { rows } = await db.query('SELECT * FROM users WHERE email = $1', [value]);
    if (rows.length) {
        throw new Error('Email is already associated with an account.');
    }
});

//check if username is taken
const usernameExists = check('username').custom(async (value) => {
    const { rows } = await db.query('SELECT * FROM users WHERE username = $1', [value]);
    if (rows.length) {
        throw new Error('Username is already taken.');
    }
});

//check if login fields are correct
const loginFieldsCheck = check('email').custom(async (value, { req }) => {
    const user = await db.query('SELECT * FROM users WHERE email = $1', [value]);

    if (!user.rows.length) {
        throw new Error('Email is incorrect');
    }

    const validPassword = await compare(req.body.password, user.rows[0].password);

    if (!validPassword) {
        throw new Error('Password is incorrect');
    }

    req.user = user.rows[0];
});


module.exports = {
    registerValidation: [email, password, emailExists, usernameExists],
    loginValidation: [loginFieldsCheck]
}