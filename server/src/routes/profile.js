const { Router } = require('express');
const router = Router();

const { register, login, logout, deleteUser} = require('../controllers/profile');
const { registerValidation, loginValidation } = require('../validators/profile');
const { validationMiddleware } = require('../middleware/validation-middleware');
const { userAuth } = require('../middleware/passport-middleware');


//Auth Routes
router
    .post('/register', registerValidation, validationMiddleware, register)
    .post('/login', loginValidation, validationMiddleware, login)
    .get('/logout', userAuth, logout)
    .delete('/delete-user', userAuth, deleteUser, logout);


module.exports = router;