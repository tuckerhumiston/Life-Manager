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
const todoRoute = require('./routes/todo');
const profileRoute = require('./routes/profile');


//initialize routes
app.use('/api', todoRoute);
app.use('/profile', profileRoute);


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

module.exports = app;