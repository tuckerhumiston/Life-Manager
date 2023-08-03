const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;

// Include routes
const userRoute = require('./routes/User');
const todoListRoute = require('./routes/Todo_Lists');
const todoItemRoute = require('./routes/Todo_Items');


// Middleware
app.use(cors());
app.use(express.json());  // req.body

// Routes
app.use('/user', userRoute);
app.use('/todo_lists', todoListRoute);
app.use('/todo_items', todoItemRoute);

// Create routes for user password



// Start server
app.listen(PORT, () => {
    console.log(`Server has started on port ${PORT}`);
});
