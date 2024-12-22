const { events, nextEventId } = require('../data');

// Find all events
function findAllEvents() {
  return events;
}

// Find event by id
function findEventById(id) {
  return events.find(e => e.id === Number(id));
}

// Create event
function createEvent(eventData) {
  eventData.id = nextEventId;
  eventData.attendees = [];
  events.push(eventData);
  return eventData;
}

// Update event
function updateEvent(event, updates) {
  Object.assign(event, updates);
  return event;
}

// Delete event
function removeEvent(id) {
  const index = events.findIndex(e => e.id === Number(id));
  if (index !== -1) {
    events.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  findAllEvents,
  findEventById,
  createEvent,
  updateEvent,
  removeEvent
};

