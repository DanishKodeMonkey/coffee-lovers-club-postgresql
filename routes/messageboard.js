const express = require('express');
const ensureAuthenticated =
    require('../middleware/authMiddleware').ensureAuthenticated;
const router = express.Router();

// require  controller modules
const messages_controller = require('../controllers/messagesController');

/// index route ///
router.get('/', ensureAuthenticated, messages_controller.index);

/// MESSAGES ROUTES ///
// GET request for create message
router.get(
    '/messages/create',
    ensureAuthenticated,
    messages_controller.message_create_get
);

// POST request for create message
router.get(
    '/messages/create',
    ensureAuthenticated,
    messages_controller.message_create_post
);

// GET request for delete message
router.get(
    '/messages/:id/delete',
    ensureAuthenticated,
    messages_controller.message_delete_get
);

// POST request for delete message
router.get(
    '/messages/:id/delete',
    ensureAuthenticated,
    messages_controller.message_delete_post
);

// GET request for update message
router.get(
    '/messages/:id/update',
    ensureAuthenticated,
    messages_controller.message_update_get
);

// POST request for update message
router.get(
    '/messages/:id/update',
    ensureAuthenticated,
    messages_controller.message_update_post
);

// GET request for all messages
router.get('/messages', ensureAuthenticated, messages_controller.messages_list);

module.exports = router;
