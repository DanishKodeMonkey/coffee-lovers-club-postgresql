const bcrypt = require('bcryptjs');

const pool = require('./pool');

require('dotenv').config();

/* userController queries */

const userQueries = {
    /* Fetch user by ID */
    getUserById: async (userId) => {
        try {
            const result = await pool.query(
                `SELECT * FROM users WHERE id = $1`,
                [userId]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error fetching user by ID: ', err);
            throw err;
        }
    },

    /* Fetch latest messages from user */
    getLatestMessages: async () => {
        try {
            const result = await pool.query(`
                SELECT title, message, timestamp
                FROM messages
                ORDER BY timestamp DESC
                LIMIT 3
                `);
            return result.rows;
        } catch (err) {
            console.error('Error fetching latest messages: ', err);
            throw err;
        }
    },

    /* Create new user */
    createUser: async ({ username, first_name, last_name, password }) => {
        try {
            const hashedPassword = await bcrypt.hash(
                password,
                process.env.HASH_SALT
            );
            const result = await pool.query(
                `
            INSERT INTO users(username, first_name, last_name, password) 
            VALUES($1, $2, $3, $4) 
            RETURNING username
            `,
                [username, first_name, last_name, hashedPassword]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error creating user: ', err);
            throw err;
        }
    },

    /* Update existing user */
    updateUserMembership: async (id, membership) => {
        try {
            const result = await pool.query(
                `
        UPDATE users 
        SET membership = $1 
        WHERE id = $2 
        RETURNING username, membership
        `,
                [membership, id]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error upgrading user: ', err);
            throw err;
        }
    },
};

const messageQueries = {
    getLatestMessages: async (limit) => {
        try {
            const result = await pool.query(
                `
            SELECT * FROM messages
            ORDER BY timestamp DESC
            LIMIT $1
            `,
                [limit]
            );
            return result.rows;
        } catch (err) {
            console.error('Error fetching messages: ', err);
            throw err;
        }
    },
    getAllMessages: async () => {
        try {
            const result = await pool.query(`
            SELECT * FROM messages 
            ORDER BY timestamp DESC
            `);
            return result.rows;
        } catch (err) {
            console.error('Error fetching all messages: ', err);
            throw err;
        }
    },
    createMessage: async ({ author, title, message }) => {
        try {
            const result = await pool.query(
                `
            INSERT INTO messages(author, title, message, timestamp)
            VALUES($1, $2, $3, NOW()) 
            RETURNING *
            `,
                [author, title, message]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error creating new message: ', err);
            throw err;
        }
    },
    getMessageById: async (messageId) => {
        try {
            const result = await pool.query(
                `
                SELECT * FROM messages WHERE id = $1
                `,
                [messageId]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error fetching message by ID: ', err);
            throw err;
        }
    },
    deleteMessageById: async (messageId) => {
        try {
            const result = await pool.query(
                `
                DELETE FROM messages WHERE id = $1 RETURNING title
                `,
                [messageId]
            );
            return result.rows[0];
        } catch (err) {
            console.error('Error deleting message by ID: ', err);
            throw err;
        }
    },
};
module.exports = { userQueries, messageQueries };
