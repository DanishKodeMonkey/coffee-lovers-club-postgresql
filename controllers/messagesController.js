const { body, validationResult } = require('express-validator');
const Messages = require('../models/messages');
const asyncHandler = require('express-async-handler');

// Index route
exports.index = asyncHandler(async (req, res, next) => {
    res.render('index', {
        title: 'Coffee Lovers Messageboard',
        user: req.user,
    });
});

// display all messages
exports.messages_list = asyncHandler(async (req, res, next) => {
    const allMessages = await Messages.find({})
        .populate('author', 'username')
        .sort({ timestamp: 1 })
        .exec();

    res.render('messageboard', {
        title: 'Messageboard',
        messages: allMessages,
        userId: req.user._id,
        userMembership: req.user.membership,
    });
});

// create new message POST
exports.message_create_post = [
    // validate and sanitize the contents of the request body
    body('author').notEmpty().escape(),
    body('title', 'Title must be between 1 and 100 characters')
        .trim()
        .isLength({ min: 1, max: 100 })
        .escape(),
    body('message', 'Message must be between 1 and 600 characters')
        .trim()
        .isLength({ min: 1, max: 600 })
        .escape(),

    // process request after validation
    asyncHandler(async (req, res, next) => {
        console.log('Handling message request body', req.body);
        // Extract errors
        const errors = validationResult(req);

        // create new message object
        const message = new Messages({
            author: req.body.author,
            title: req.body.title,
            message: req.body.message,
        });
        if (!errors.isEmpty()) {
            console.error('ERROR: data error found');
            // handle error with modal here
        } else {
            await message.save();
            res.redirect('/messageboard/messages');
        }
    }),
];

// delete message POST
exports.message_delete_post = asyncHandler(async (req, res, next) => {
    // extract message ID from params
    const messageId = req.params.id;

    // find message from ID
    const message = await Messages.findById(messageId);

    // Check if message exists
    if (!message) {
        res.status(404).send('Message not found');
        return;
    }

    // check if current user is authorized to delete the message
    if (
        req.user &&
        (req.user._id.equals(message.author) || req.user.membership === 'admin')
    ) {
        // User is authorized, proceed with deletion from database
        await Messages.findByIdAndDelete(messageId);
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
