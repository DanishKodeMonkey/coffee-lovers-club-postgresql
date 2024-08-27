const { body, validationResult } = require('express-validator');
const asyncHandler = require('express-async-handler');
const { messageQueries } = require('../db/queries');

// Index route
exports.index = asyncHandler(async (req, res, next) => {
    // Fetch the last 3 messages sorted by timestamp, only getting titles, messages and timestamps
    const latestMessages = await messageQueries.getLatestMessages(4);
    res.render('index', {
        title: 'Coffee Lovers Messageboard',
        user: req.user ? req.user : null,
        latestMessages: latestMessages,
        errors: [],
    });
});

// display all messages
exports.messages_list = asyncHandler(async (req, res, next) => {
    const allMessages = await messageQueries.getAllMessages();
    // Determine if user is authenticated, if not assign anon flag
    const isAnon = !req.isAuthenticated();

    res.render('messageboard', {
        title: 'Messageboard',
        messages: allMessages,
        // is user signed in? Determines read only mode
        isAnon,
        user: req.user ? req.user : null,
        userId: req.user ? req.user.id : null,
        userMembership: req.user ? req.user.membership : null,
    });
});

// create new message POST
exports.message_create_post = [
    // validate and sanitize the contents of the request body
    body('author').notEmpty().escape(),
    body('title', 'Title must be between 1 and 100 characters')
        .trim()
        .isLength({ min: 1, max: 50 })
        .escape(),
    body('message', 'Message must be between 1 and 600 characters')
        .trim()
        .isLength({ min: 1, max: 600 })
        .escape(),

    // process request after validation
    asyncHandler(async (req, res, next) => {
        // Extract errors
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            console.error('ERROR: data error found');
        } else {
            await messageQueries.createMessage({
                author: req.body.author,
                title: req.body.title,
                message: req.body.message,
            });
            res.redirect('/messageboard/messages');
        }
    }),
];

// delete message POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
    // extract message ID from params
    const messageId = req.params.id;

    // find message from ID
    const message = await messageQueries.getMessageById(messageId);

    // Check if message exists
    if (!message) {
        res.status(404).send('Message not found');
        return;
    }

    // check if current user is authorized to delete the message
    if (
        req.user &&
        (req.user.id === message.author || req.user.membership === 'Admin')
    ) {
        // User is authorized, proceed with deletion from database
        await messageQueries.deleteMessageById(messageId);
        res.redirect('/messageboard/messages');
    } else {
        // User is not authorized to delete this message
        res.status(403).send('Unauthorized deletion');
    }
});

// update message GET
exports.message_update_get = asyncHandler(async (req, res, next) => {
    res.send('not implemented: Message update GET');
});

// update message POST
exports.message_update_post = asyncHandler(async (req, res, next) => {
    res.send('not implemented: Message update POST');
});
