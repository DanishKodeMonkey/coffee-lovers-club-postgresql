const Users = require('../models/users');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// Password stuff
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// sign up form GET
exports.sign_up_get = asyncHandler(async (req, res, next) => {
    res.render('sign-up-form', { title: 'User sign up' });
});

// sign up form POST
exports.sign_up_post = [
    // validate and sanitize input
    body('username', 'Username must be specified')
        .trim()
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
        )
        .escape(),

    // process request after validation and sanitization
];

// sign in form GET
exports.sign_in_get = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: User sign in GET');
});

// sign in form POST
exports.sign_in_post = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: User sign in POST');
});
