const { Router } = require('express');
const router = Router();

const { userAuth } = require('../middleware/passport-middleware');
const {
    add_list,
    get_lists,
    get_list, 
    update_list,
    delete_list,

    add_item, 
    get_all_items, 
    get_list_items, 
    update_item, 
    delete_item
} = require('../controllers/todo');


//Middleware
router.use(userAuth)


//Todo List Routes
router
    .get('/lists', get_lists)
    .get('/list', get_list)
    .post('/list', add_list)
    .put('/list', update_list)
    .delete('/list', delete_list);

    
//Todo Item Routes
router
    .post('/item', add_item)
    .get('/items', get_all_items)
    .get('/list-items', get_list_items)
    .put('/item', userAuth, update_item)
    .delete('/item', delete_item)



module.exports = router;