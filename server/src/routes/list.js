const { Router } = require('express');
const router = Router();

// Validators
const { 
    addItemValidation, 
    getAllItemsValidation, 
    updateItemValidation, 
    deleteItemValidation 
} = require('../validators/list');

// Controllers
const {
    add_item, 
    get_all_items, 
    update_item, 
    delete_item
} = require('../controllers/lists');

// Middleware
const { userAuth } = require('../middleware/passport-middleware');
router.use(userAuth)



// Item Routes
router
    .post('/item', addItemValidation, add_item)
    .get('/item', getAllItemsValidation, get_all_items)
    .put('/item', updateItemValidation, update_item)
    .delete('/item', deleteItemValidation, delete_item);


module.exports = router;