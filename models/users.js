const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UsersSchema = new Schema({
    username: { type: String, required: true, maxLength: 30 },
    first_name: { type: String, required: true, maxLength: 30 },
    last_name: { type: String, required: true, maxLength: 30 },
    membership: {
        type: String,
        required: true,
        enum: ['Guest', 'Member', 'Admin'],
        default: 'Guest',
    },
    password: { type: String, required: true, minLength: 4, maxLength: 9999 },
    // Refer to users messages
    messages: [{ type: Schema.Types.ObjectId, ref: 'Messages' }],
});

UsersSchema.virtual('full_name').get(function () {
    // Avoid errors in cases where first or last name is somehow not existant
    let fullname = '';
    if (this.first_name && this.last_name) {
        fullname = `${this.first_name} ${this.last_name}`;
    }

    return fullname;
});

UsersSchema.virtual('url').get(function () {
    return `/club/users/${this._id}`;
});

// a action performed before model build, using bcrypt to hash password
// set up to support user password update to be implemented later
UsersSchema.pre('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});
module.exports = mongoose.model('Users', UsersSchema);
