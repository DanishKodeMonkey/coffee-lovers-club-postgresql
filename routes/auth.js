var express = require('express');
var router = express.Router();
const users_controller = require('../controllers/usersController');

// sign in GET
router.get('/sign-in', users_controller.sign_in_get);

// sign in POST
router.post('/sign-in', users_controller.sign_in_post);

// sign up GET
router.get('/sign-up', users_controller.sign_up_get);

// sign up POST
router.post('/sign-up', users_controller.sign_up_post);

module.exports = router;
