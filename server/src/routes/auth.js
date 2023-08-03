const { Router } = require('express');
const { getUsers, register, login, protected, logout} = require('../controllers/auth');
const { registerValidation, loginValidation } = require('../validators/auth');
const { validationMiddleware } = require('../middleware/validation-middleware');
const { userAuth } = require('../middleware/passport-middleware');
const router = Router();

router.get('/get-users', getUsers);
router.get('/protected', userAuth, protected);
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', userAuth, logout);

// Need to rework User.js, Todo_itsms.js and Todo_lists.js to conform to this new structure.
// Example: You should not be able to create a new user from Users.js.

module.exports = router;