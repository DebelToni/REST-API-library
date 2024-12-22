// Simple in-memory data to simulate a real database

// A sample user with "librarian" role and "user" role
const users = [
  {
    id: '1',
    username: 'Mihal',
    email: 'mihal@elsys.com',
    password: '123',
    role: 'librarian'
  },
  {
    id: '2',
    username: 'Toni',
    email: 'toni@elsys.com',
    password: '123',
    role: 'user'
  }
];

// A few sample books
const books = [
  {
    id: '1',
    title: 'The story of the first book',
    description: 'Trust must read',
    author: 'The GlobGobGalab!',
    year: 2008,
    isbn: '978-0132350884',
    quantity: 2, // how many are available
    borrowedBy: [] // array of userId(s) who currently have it
  },
  {
    id: '2',
    title: 'The Pragmatic Programmer',
    description: 'Your Journey To Mastery',
    author: 'Andrew Hunt, David Thomas',
    year: 1999,
    isbn: '978-0201616224',
    quantity: 1,
    borrowedBy: []
  }
];

// A few sample events
const events = [
  {
    id: '1',
    title: 'Weekly Book Club',
    description: 'Discussing the latest reads',
    date: '2024-10-01T19:00:00',
    location: '9ti blok mazutu',
    attendees: [] // array of userId(s)
  }
];

// In production, these would be tracked in a DB or by columns
const reservations = []; // { userId, bookId }
const borrowedHistory = []; // { userId, bookId, borrowedAt, returnedAt }

module.exports = {
  users,
  books,
  events,
  reservations,
  borrowedHistory
};

