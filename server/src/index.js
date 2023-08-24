const express = require('express');
const app = express();
const { PORT, CLIENT_URL, SECRET } = require('./constants');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const cors = require('cors');
const session = require('express-session');
const helmet = require('helmet');

//initialize middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: CLIENT_URL,
    credentials: true
}));
app.use(passport.initialize());
app.use(helmet());
app.use(session({ 
    secret: SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: true, // Use in production with HTTPS
        maxAge: 1000 * 60 * 60 * 24, // Session expiration time (1 day)
        httpOnly: true,
    },
}));


//import routes
const listRoute = require('./routes/list');
const profileRoute = require('./routes/profile');
const quoteRoute = require('./routes/quote');


//initialize routes
app.use('/feature', listRoute);
app.use('/profile', profileRoute);
app.use('/quote', quoteRoute);


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