const express = require('express');
const app = express();
const { PORT } = require('./constants');

//import routes
const authRoute = require('./routes/auth');
const userRoute = require('./routes/User');
const todoListRoute = require('./routes/Todo_Lists');
const todoItemRoute = require('./routes/Todo_Items');

//initialize routes
app.use('/api', authRoute);
app.use('/user', userRoute);
app.use('/todo_lists', todoListRoute);
app.use('/todo_items', todoItemRoute);


//app start
const appStart = () => {
    try {
        app.listen(PORT, () => {
            console.log(`The app is running at http:localhost:${PORT}`);
        });
    } catch (err) {
        console.error`Error: ${(err.message)}`;
    }
}

appStart();