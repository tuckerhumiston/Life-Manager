const { Router } = require('express');
const router = Router();

const { register, login, logout, deleteUser} = require('../controllers/profile');
const { registerValidation, loginValidation } = require('../validators/profile');
const { validationMiddleware } = require('../middleware/validation-middleware');
const { userAuth } = require('../middleware/passport-middleware');

const rateLimit = require("express-rate-limit");

const loginRateLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10, // Max 5 login attempts per hour
    message: "Too many login attempts, please try again later.",
  });

//Auth Routes
router
    .post('/register', registerValidation, validationMiddleware, register)
    .post('/login', loginValidation, loginRateLimiter, validationMiddleware, login)
    .get('/logout', userAuth, logout)
    .delete('/delete-user', userAuth, deleteUser, logout);


module.exports = router;