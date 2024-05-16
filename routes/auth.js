var express = require('express');
var router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local');

const users_controller = require('../models/users');

// sign in GET
router.get('/sign-in', (req, res, next) => {
    res.send('Not implemented: User sign in GET');
});

// sign in POST
router.post('/sign-in', (req, res, next) => {
    res.send('Not implemented: User sign in POST');
});

// sign up GET
router.get('/sign-up', (req, res, next) => {
    res.render('sign-up-form', { title: 'Sign up' });
});

// sign up POST
router.post('/sign-up', (req, res, next) => {
    res.send('Not implemented: User sign up POST');
});

module.exports = router;
