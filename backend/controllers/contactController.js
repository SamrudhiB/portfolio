// Import the Contact model (database functions)
const Contact = require('../models/Contact');

// Function to handle contact form submission
async function submitContact(req, res) {
    try {
        // Step 1: Extract form data from request
        const { name, email, message } = req.body;

        // Step 2: Validate data (basic checks)
        if (!name || !email || !message) {
            // If any field is empty, return error
            return res.status(400).json({
                success: false,
                message: 'All fields are required'
            });
        }

        // Step 3: Validate email format (basic check)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid email format'
            });
        }

        // Step 4: Check message length (prevent spam)
        if (message.length < 5) {
            return res.status(400).json({
                success: false,
                message: 'Message must be at least 5 characters'
            });
        }

        // Step 5: Save to database using model
        const newContact = await Contact.createContact(name, email, message);

        // Step 6: Send success response
        res.status(201).json({
            success: true,
            message: 'Contact message saved successfully!',
            data: newContact
        });

    } catch (error) {
        // If error occurs, send error response
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            message: 'Error saving contact message',
            error: error.message
        });
    }
}

// Function to get all contacts (admin view)
async function getAllContacts(req, res) {
    try {
        const contacts = await Contact.getAllContacts();

        res.status(200).json({
            success: true,
            data: contacts,
            count: contacts.length
        });

    } catch (error) {
        console.error('Controller error:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching contacts',
            error: error.message
        });
    }
}

// Export functions
module.exports = {
    submitContact,
    getAllContacts
};


