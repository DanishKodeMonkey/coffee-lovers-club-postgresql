const Users = require('../models/users');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Password stuff
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// For sign in, use passport for authentication
passport.use(
    // set up new local strategy using input username and password
    new LocalStrategy(async (username, password, done) => {
        try {
            //Try to:
            // Find user by username
            const user = await User.findOne({ username: username });
            // If user is not found, finish with message
            if (!user) {
                return done(null, false, { message: 'Incorrect username' });
            }
            // If user password does not match stored password, finish with message
            if (user.password !== password) {
                return done(null, false, { message: 'Incorrect password' });
            }
            // Otherwise, pass authentication
            return done(null, user);
            // Anything go wrong ,return error.
        } catch (err) {
            return done(err);
        }
    })
);

// Serialization functions for maintaining login state in session
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// sign up form GET
exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render('sign-up-form', { title: 'User sign up' });
});

// sign up form POST
exports.sign_up_post = [
    // validate and sanitize input
    body('username', 'Username must be specified')
        .isLength({ min: 1, max: 100 })
        .withMessage('Keep username length to 100 characters or below')
        .escape(),
    body('firstName', 'First name must be specified')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Keep first name length to 200 characters or below')
        .escape(),
    body('lastName', 'Last name must be specified')
        .trim()
        .isLength({ min: 1, max: 200 })
        .withMessage('Keep last name length to 200 characters or below')
        .escape(),
    body('password', 'A password is required')
        .trim()
        .isLength({ min: 4, max: 9999 })
        .withMessage(
            'Please ensure passwords are between 4 and 9999 characters.'
        ),

    // process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        // extract validation errors from request
        const errors = validationResult(req);

        // create new user object with verified data
        const user = new Users({
            username: req.body.username,
            first_name: req.body.firstName,
            last_name: req.body.lastName,
            password: req.body.password,
        });
        if (!errors.isEmpty()) {
            // Errors detected, render form again with values and error message
            res.render('sign-up-form', {
                title: 'Sign up',
                user: user,
                errors: errors.array(),
            });
            return;
        } else {
            // Data form is valid
            await user.save();
            res.redirect('/');
        }
    }),
];

// sign in form GET
exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: User sign in GET');
});

// sign in form POST
exports.sign_in_post = asyncHandler(async (req, res, next) => {});
