// Import the database connection
const pool = require('../config/database');

// Function to save new contact to database
async function createContact(name, email, message) {
    try {
        // SQL query with $1, $2, $3 placeholders (prevents SQL injection)
        const query = `
            INSERT INTO contacts (name, email, message)
            VALUES ($1, $2, $3)
            RETURNING id, name, email, message, created_at
        `;

        // Execute query with actual values
        const result = await pool.query(query, [name, email, message]);

        // Return the newly created contact
        return result.rows[0];

    } catch (error) {
        // If something goes wrong, throw error to controller
        console.error('Database error:', error);
        throw error;
    }
}

// Function to get all contacts (optional - for admin dashboard later)
async function getAllContacts() {
    try {
        const query = 'SELECT * FROM contacts ORDER BY created_at DESC';
        const result = await pool.query(query);
        return result.rows;

    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

// Function to get single contact by ID (optional)
async function getContactById(id) {
    try {
        const query = 'SELECT * FROM contacts WHERE id = $1';
        const result = await pool.query(query, [id]);
        return result.rows[0];

    } catch (error) {
        console.error('Database error:', error);
        throw error;
    }
}

// Export functions so controller can use them
module.exports = {
    createContact,
    getAllContacts,
    getContactById
};
