const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { SECRET } = require('../constants');
const db = require('../db');

// Extract JWT token from the request cookies
const cookieExtractor = (req) => {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['token'];
    }
    return token;
};

// Options for the JWT strategy
const jwtOptions = {
    secretOrKey: SECRET,
    jwtFromRequest: cookieExtractor,
};

// JWT strategy implementation
passport.use(new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
        const { rows } = await db.query('SELECT id, email FROM users WHERE id = $1', [jwtPayload.id]);

        if (!rows.length) {
            // If user is not found, indicate authentication failure
            return done(null, false);
        }

        // User found, indicate successful authentication
        const user = {
            id: rows[0].id,
            email: rows[0].email
        };
        return done(null, user);
    } catch (error) {
        console.log(error.message);
        return done(error, false);
    }
}));

// Export the authentication middleware
exports.userAuth = passport.authenticate('jwt', { session: false });
