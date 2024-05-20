const Messages = require('../models/messages');
const asyncHandler = require('express-async-handler');
const currentUser = require('../middleware/authMiddleware').currentUser;

// Index route
exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', {
        title: 'Coffee Lovers Messageboard',
        user: req.user,
    });
});

// display all messages
exports.messages_list = asyncHandler(async (req, res, next) => {
    res.send('Not implemented: messages list');
});

// create new message GET
exports.message_create_get = asyncHandler(async (req, res, next) => {
    res.send(' not implemented: message create GET');
});

// create new message POST
exports.message_create_post = asyncHandler(async (req, res, next) => {
    res.send(' not implemented: message create POST');
});

// delete message GET
exports.message_delete_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: message delete GET');
});

// delete message POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: message delete POST');
});

// update message GET
exports.message_update_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: Message update GET');
});

// update message POST
exports.message_update_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: Message update POST');
});
