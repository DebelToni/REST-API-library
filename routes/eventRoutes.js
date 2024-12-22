const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');

// Get all events
router.get('/', eventController.getAllEvents);

// Get one event
router.get('/:id', eventController.getEventById);

// Create event
router.post('/', eventController.createEvent);

// Update event
router.put('/:id', eventController.updateEvent);

// Delete event
router.delete('/:id', eventController.deleteEvent);

// Register for an event
router.post('/:id/register', eventController.registerForEvent);

// Cancel registration
router.delete('/:id/register', eventController.cancelRegistration);

// Invite multiple users
router.post('/:id/invite', eventController.inviteUsers);

module.exports = router;

