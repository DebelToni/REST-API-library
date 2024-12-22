const { events } = require('../data/fakeDb');

// Get all events (optionally filter)
exports.getAllEvents = (req, res) => {
  res.json(events);
};

// Get an event by ID
exports.getEventById = (req, res) => {
  const { id } = req.params;
  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }
  res.json(event);
};

// Create a new event
exports.createEvent = (req, res) => {
  const { title, description, date, location } = req.body;

  if (!title || !date) {
    return res.status(400).json({ error: 'Missing title or date' });
  }

  const newEvent = {
    id: (events.length + 1).toString(),
    title,
    description: description || '',
    date,
    location: location || '',
    attendees: []
  };
  events.push(newEvent);

  res.status(201).json({ message: 'Event created', event: newEvent });
};

// Update an event
exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const { title, description, date, location } = req.body;

  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  if (title !== undefined) event.title = title;
  if (description !== undefined) event.description = description;
  if (date !== undefined) event.date = date;
  if (location !== undefined) event.location = location;

  res.status(200).json({ message: 'Event updated', event });
};

// Delete an event
exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  const index = events.findIndex(e => e.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Event not found' });
  }
  events.splice(index, 1);
  res.status(200).json({ message: `Event ${id} deleted` });
};

// Register for an event
exports.registerForEvent = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  if (event.attendees.includes(userId)) {
    return res.status(409).json({ error: 'User already registered' });
  }

  event.attendees.push(userId);
  res.status(200).json({ message: `User ${userId} registered for event ${id}` });
};

// Cancel registration
exports.cancelRegistration = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body; // or from query param

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  const index = event.attendees.indexOf(userId);
  if (index === -1) {
    return res.status(409).json({ error: 'User is not registered for this event' });
  }

  event.attendees.splice(index, 1);
  res.status(200).json({ message: `User ${userId} canceled registration for event ${id}` });
};

// Invite multiple users
exports.inviteUsers = (req, res) => {
  const { id } = req.params;
  const { userIds } = req.body; // array of user IDs

  if (!userIds || !Array.isArray(userIds)) {
    return res.status(400).json({ error: 'Missing or invalid userIds array' });
  }

  const event = events.find(e => e.id === id);
  if (!event) {
    return res.status(404).json({ error: 'Event not found' });
  }

  // For simplicity, just push them into the attendees array
  userIds.forEach(uId => {
    if (!event.attendees.includes(uId)) {
      event.attendees.push(uId);
    }
  });

  res.status(200).json({ message: `Invited users to event ${id}`, attendees: event.attendees });
};

