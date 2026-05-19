// Import Express
const express = require('express');

// Create router (sub-app for these routes)
const router = express.Router();

// Import controller
const { submitContact, getAllContacts } = require('../controllers/contactController');

// POST endpoint: Save new contact message
// When frontend sends POST to /api/contact, run submitContact function
router.post('/', submitContact);

// GET endpoint: Fetch all contacts (optional - for admin)
// When frontend sends GET to /api/contacts, run getAllContacts function
router.get('/', getAllContacts);

// Export router
module.exports = router;
