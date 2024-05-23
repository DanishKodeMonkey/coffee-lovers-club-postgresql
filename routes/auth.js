var express = require('express');
var router = express.Router();
const ensureAuthenticated =
    require('../middleware/authMiddleware').ensureAuthenticated;
const users_controller = require('../controllers/usersController');

// sign in GET
router.get('/sign-in', users_controller.sign_in_get);

// sign in POST
router.post('/sign-in', users_controller.sign_in_post);

// sign up GET
router.get('/sign-up', users_controller.sign_up_get);

// sign up POST
router.post('/sign-up', users_controller.sign_up_post);

// upgrade user POST
router.post('/upgrade-user', users_controller.upgrade_user_post);

// attain admin priviliges GET
router.get('/admin', ensureAuthenticated, users_controller.admin_get);

// attain admin proviliges POST
router.post('/admin', ensureAuthenticated, users_controller.admin_post);

router.get('/sign-out', (req, res, next) => {
    req.logout(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

module.exports = router;
