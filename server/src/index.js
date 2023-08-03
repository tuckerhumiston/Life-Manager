const express = require('express');
const app = express();
const { PORT, CLIENT_URL } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');

//initialize middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(passport.initialize());

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