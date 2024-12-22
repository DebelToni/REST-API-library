const { users, nextUserId } = require('../data');

// Find user by email
function findUserByEmail(email) {
  return users.find(u => u.email === email);
}

// Find user by id
function findUserById(id) {
  return users.find(u => u.id === Number(id));
}

// Create a new user
function createUser({ username, email, password, role }) {
  const newUser = {
    id: nextUserId,
    username,
    email,
    password, // hashed password
    role: role || 'user',
    borrowedBooks: [],
    reservedBooks: [],
    eventsRegistered: []
  };
  users.push(newUser);
  return newUser;
}

// Update user
function updateUser(user, updates) {
  Object.assign(user, updates);
  return user;
}

module.exports = {
  findUserByEmail,
  findUserById,
  createUser,
  updateUser
};

