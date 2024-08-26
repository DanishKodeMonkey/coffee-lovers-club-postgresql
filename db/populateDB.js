const pool = require('./pool');
require('dotenv').config();

const initTables = async () => {
    const client = await pool.connect();
    try {
        console.log('Starting database population operation...');
        await client.query('BEGIN');

        /* ENUM type required for membership status */

        // Check if ENUM type exists
        console.log('Checking for existing ENUM type...');
        const result = await client.query(`
            SELECT EXISTS(
                SELECT 1
                FROM pg_type
                WHERE typname = 'membership_type'
                );
            `);

        const enumExists = result.rows[0].exists;
        // Create ENUM type if it does not already exist
        if (!enumExists) {
            console.log(
                'ENUM type membership_type not found, is required for table, creating...'
            );
            await client.query(`
                CREATE TYPE membership_type AS ENUM('Guest', 'Member', 'Admin');
                `);
            console.log("ENUM type 'membership_type' created.");
        } else {
            console.log(
                "ENUM type 'membership_type' already exists. skipping..."
            );
        }
        console.log('Trying to create "users" table...');
        // create users table
        await client.query(`
            CREATE TABLE IF NOT EXISTS users(
            id SERIAL PRIMARY KEY,
            username VARCHAR(30) NOT NULL UNIQUE,
            first_name VARCHAR(30) NOT NULL,
            last_name VARCHAR(30) NOT NULL,
            membership membership_type NOT NULL DEFAULT 'Guest',
            password VARCHAR(255) NOT NULL
            );
            `);
        console.log("Table 'users' created or already exists...");
        console.log('Trying to create "messages" table...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS messages(
            id SERIAL PRIMARY KEY,
            user_id INT REFERENCES users(id) ON DELETE CASCADE,
            title VARCHAR(50) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
            )
            `);
        console.log("Table 'messages' created or already exists...");
        console.log('Committing changes to database...');
        await client.query('COMMIT');
        console.log('ALl tables committed successfully!');
    } catch (err) {
        await client.query('ROLLBACK');
        console.error('Error setting up database: ', err);
    } finally {
        client.release();
        console.log('Population operation ended... Goodbye!');
    }
};

/* Check environment and execute or export accordingly */
if (process.env.NODE_ENV === 'development') {
    // Run script if in dev environment
    initTables().catch((err) => console.error('Initialization failed: ', err));
} else {
    module.exports = initTables;
}
