const { Router } = require('express');
const router = Router();

const { userAuth } = require('../middleware/passport-middleware');
const {
    add_item, 
    get_all_items, 
    update_item, 
    delete_item
} = require('../controllers/lists');


// Middleware
router.use(userAuth)
    
// Item Routes
router
    .post('/item', add_item)
    .get('/item', get_all_items)
    .put('/item', update_item)
    .delete('/item', delete_item);


module.exports = router;