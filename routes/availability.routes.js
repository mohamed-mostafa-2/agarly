const express = require('express');
const router = express.Router();

const { checkAvailability, addUnavailableDates } = require('../controllers/availability.controller');
const { protect, allowedTo } = require('../controllers/auth.controller');

// Protect all routes after this middleware
router.use(protect);
router.post(
    "/checkAvailability",
    allowedTo("Agent", "Admin"),
    checkAvailability
);
router.post(
    '/addUnavailableDates',
    allowedTo('Agent', 'Admin'),
    addUnavailableDates
);

module.exports = router;