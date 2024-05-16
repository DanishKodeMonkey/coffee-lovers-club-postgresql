const express = require('express');
const router = express.Router();

// require  controller modules
const messages_controller = require('../controllers/messagesController');

/// index route ///
router.get('/', messages_controller.index);

/// MESSAGES ROUTES ///
// GET request for create message
router.get('/messages/create', messages_controller.message_create_get);

// POST request for create message
router.get('/messages/create', messages_controller.message_create_post);

// GET request for delete message
router.get('/messages/:id/delete', messages_controller.message_delete_get);

// POST request for delete message
router.get('/messages/:id/delete', messages_controller.message_delete_post);

// GET request for update message
router.get('/messages/:id/update', messages_controller.message_update_get);

// POST request for update message
router.get('/messages/:id/update', messages_controller.message_update_post);

// GET request for all messages
router.get('/messages', messages_controller.messages_list);

module.exports = router;
