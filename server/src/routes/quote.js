const { Router } = require('express');
const router = Router();
const { userAuth } = require('../middleware/passport-middleware');
const { getQuote } = require('../controllers/quote');

// Middleware
router.use(userAuth)

// Item Routes
router.get('/new', getQuote);

module.exports = router;