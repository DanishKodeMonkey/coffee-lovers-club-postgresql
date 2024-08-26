require('dotenv').config();
const asyncHandler = require('express-async-handler');
const passport = require('../config/passport'); // import pre-configured passport
const { body, validationResult } = require('express-validator');
const { userQueries } = require('../db/queries');

// sign up form GET
exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render('sign-up-form', { title: 'User sign up', user: {}, errors: [] });
});

// sign up form POST
exports.sign_up_post = [
    // validate and sanitize input
    body('username', 'Username must be specified')
        .isLength({ min: 1, max: 30 })
        .withMessage('Keep username length to 30 characters or below')
        .escape(),
    body('firstName', 'First name must be specified')
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Keep first name length to 30 characters or below')
        .escape(),
    body('lastName', 'Last name must be specified')
        .trim()
        .isLength({ min: 1, max: 30 })
        .withMessage('Keep last name length to 30 characters or below')
        .escape(),
    body('password', 'A password is required')
        .trim()
        .isLength({ min: 4, max: 9999 })
        .withMessage(
            'Please ensure passwords are between 4 and 9999 characters.'
        ),

    // custom validation to check for password match for confirm password field
    body('confirmPassword', 'Passwords do not match').custom(
        (value, { req }) => value === req.body.password
    ),

    // process request after validation and sanitization
    asyncHandler(async (req, res, next) => {
        // extract validation errors from request
        const errors = validationResult(req);

        // Error detected, render form again with values and error messages
        if (!errors.isEmpty()) {
            console.error(
                'Something went wrong, resending form: ',
                errors,
                req.body
            );
            // Errors detected, render form again with values and error message
            res.render('sign-up-form', {
                title: 'Sign up',
                user: req.body,
                errors: errors.array(),
            });
            return;
        } else {
            // Data form is valid
            const { username, firstname, lastname, password } = req.body;
            try {
                await userQueries.createUser({
                    username: username.toUpperCase(),
                    first_name: firstname,
                    last_name: lastname,
                    password: password, //Hashing will be done in queries.
                });
                res.redirect('/auth/sign-in');
            } catch (err) {
                console.error('Error creating user: ', err);
                next(err);
            }
        }
    }),
];

// sign in form GET
exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.render('sign-in-form', {
        title: 'User sign in',
        errors: [],
        user: req.user ? req.user : null,
    });
});

// sign in form POST
exports.sign_in_post = (req, res, next) => {
    console.log('Attempting to authenticate user...');
    passport.authenticate('local', (err, user, info) => {
        console.log('Authentication callback executed...');
        if (err) {
            console.error('ERROR: ', err);
            return next(err);
        }
        if (!user) {
            console.log('Authentication failed: ', info.message);
            return res.render('sign-in-form', {
                title: 'User sign-in',
                errors: [{ msg: info.message }],
            });
        }
        req.logIn(user, (err) => {
            if (err) {
                console.error('Login error: ', err);
                return next(err);
            }
            console.log('User authenticated succesfully: ', user);
            return res.redirect('/');
        });
    })(req, res, next);
};

exports.upgrade_user_post = [
    body('userId').trim().escape(),
    body('superSecretMemberKey', 'The key did not match').custom(
        (value, { req }) => value === process.env.SUPER_SECRET_KEY
    ),

    // shandle request after validation
    asyncHandler(async (req, res, next) => {
        // extract errors from validation result if failed
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            // Fetch the last 3 messages sorted by timestamp, only getting titles, messages and timestamps
            const latestMessages = await Messages.find({})
                .sort({ timestamp: -1 })
                .limit(3)
                .select('title message timestamp')
                .exec();

            // Danish Kode Monkey was here //
            res.set(
                'X-Membership-Passphrase',
                `Pst! The passphrase is ${process.env.SUPER_SECRET_KEY}`
            );
            // validation error found, render form again with error message
            res.render('index', {
                title: 'Coffee Lovers Messageboard',
                latestMessages: latestMessages,
                user: req.user,
                errors: errors.array(),
            });
            return;
        }
        // validation succesful, proceed with upgrade
        const user = await Users.findById(req.body.userId);
        if (!user) {
            // User not found
            return res.status(404).send('User not found, upgrade cancelled.');
        }
        user.membership = 'Member'; //Update membership
        await user.save();
        res.redirect('/');

        // create new user object, but remember _id to update existing user
    }),
];
// Admin authentication form GET
exports.admin_get = asyncHandler(async (req, res, next) => {
    res.render('admin_auth', { title: 'Admin Authentication', errors: [] });
});

// Admin authentication form POST
exports.admin_post = [
    body('secret')
        .trim()
        .isLength({ min: 1 })
        .withMessage('Secret duper secret passphrase is required')
        .escape(),

    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render('admin_auth', {
                title: 'Admin Authentication',
                errors: errors.array(),
            });
        }

        if (req.body.secret === process.env.SUPER_DUPER_SECRET_KEY) {
            req.user.membership = 'Admin';
            await req.user.save();
            res.redirect('/messageboard/messages');
        } else {
            res.render('admin_auth', {
                title: 'Admin Authentication',
                errors: [{ msg: 'Incorrect passphrase... ' }],
            });
        }
    }),
];
