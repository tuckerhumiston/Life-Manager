const { Router } = require('express');
const router = Router();

const { register, login, logout, deleteUser} = require('../controllers/auth');
const { add_list, get_lists, get_list, update_list, delete_list,
        add_item,  } = require('../controllers/todo');

const { registerValidation, loginValidation } = require('../validators/auth');

const { validationMiddleware } = require('../middleware/validation-middleware');
const { userAuth } = require('../middleware/passport-middleware');

//Auth Routes
router.post('/register', registerValidation, validationMiddleware, register);
router.post('/login', loginValidation, validationMiddleware, login);
router.get('/logout', userAuth, logout);
router.delete('/delete-user', userAuth, deleteUser, logout);

//Todo List Routes
router.get('/lists', userAuth, get_lists);
router.get('/list', userAuth, get_list);
router.post('/list', userAuth, add_list);
router.put('/list', userAuth, update_list);
router.delete('/list', userAuth, delete_list);

//Todo Item Routes
router.post('/item', userAuth, add_item);


module.exports = router;