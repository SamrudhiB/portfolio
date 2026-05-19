// Import dependencies
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Import routes
const contactRoutes = require('./routes/contact');
const resumeRoutes = require('./routes/resume');

// Import middleware
const errorHandler = require('./middleware/errorHandler');

// Create Express app
const app = express();

// === MIDDLEWARE ===

// CORS: Allow frontend to talk to backend
// During deployment, this allows requests from the frontend.
app.use(cors({
    origin: true,
    credentials: true
}));

// Parse JSON data
app.use(bodyParser.json());

// Parse URL-encoded form data
app.use(bodyParser.urlencoded({ extended: true }));

// === ROUTES ===

// Health check endpoint (test if server is running)
app.get('/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// API routes
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);

// 404 Not Found
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Error handler (must be last)
app.use(errorHandler);

// === START SERVER ===

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`
    ╔════════════════════════════════╗
    ║   Server running on port ${PORT}     ║
    ║   http://localhost:${PORT}         ║
    ╚════════════════════════════════╝
    `);
});