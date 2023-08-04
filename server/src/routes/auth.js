const { Router } = require('express');
const router = Router();

const { register, login, logout, deleteUser} = require('../controllers/auth');
const { add_list, get_lists, get_list, update_list, delete_list,
        add_item, get_all_items, get_list_items, update_item, delete_item} = require('../controllers/todo');

const { registerValidation, loginValidation } = require('../validators/auth');

const { validationMiddleware } = require('../middleware/validation-middleware');
const { userAuth } = require('../middleware/passport-middleware');

//Auth Routes
router
    .post('/register', registerValidation, validationMiddleware, register)
    .post('/login', loginValidation, validationMiddleware, login)
    .get('/logout', userAuth, logout)
    .delete('/delete-user', userAuth, deleteUser, logout);

//Todo List Routes
router
    .get('/lists', userAuth, get_lists)
    .get('/list', userAuth, get_list)
    .post('/list', userAuth, add_list)
    .put('/list', userAuth, update_list)
    .delete('/list', userAuth, delete_list);

//Todo Item Routes
router
    .post('/item', userAuth, add_item)
    .get('/items', userAuth, get_all_items)
    .get('/list-items', userAuth, get_list_items)
    .put('/item', userAuth, update_item)
    .delete('/item', userAuth, delete_item)



module.exports = router;