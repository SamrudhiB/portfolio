// Import Express and File System
const express = require('express');
const path = require('path');

// Create router
const router = express.Router();

// GET endpoint: Download resume PDF
router.get('/', (req, res) => {
    try {
        // Path to resume file (in frontend folder)
        const resumePath = path.join(__dirname, '../frontend/resume.pdf');

        // Send file as download
        res.download(resumePath, 'resume.pdf', (err) => {
            if (err) {
                console.error('Download error:', err);
                res.status(500).json({
                    success: false,
                    message: 'Error downloading resume'
                });
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error retrieving resume',
            error: error.message
        });
    }
});

module.exports = router;