const { users } = require('../data/fakeDb');

// Get all users
exports.getAllUsers = (req, res) => {
  res.status(200).json(users);
};

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  res.json(user);
};

// Create a new user (alternative to /auth/register, typically for librarians)
exports.createUser = (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'User already exists' });
  }

  const newUser = {
    id: (users.length + 1).toString(),
    username,
    email,
    password,
    role: role || 'user'
  };
  users.push(newUser);

  res.status(201).json({ message: 'User created', user: newUser });
};

// Update user
exports.updateUser = (req, res) => {
  const { id } = req.params;
  const { username, email, password, role } = req.body;

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  // Update fields if they exist in the request
  if (username) user.username = username;
  if (email) user.email = email;
  if (password) user.password = password;
  if (role) user.role = role;

  res.status(200).json({ message: 'User updated', user });
};

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params;
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.status(200).json({ message: `User ${id} deleted` });
};

// Get profile
exports.getProfile = (req, res) => {
  const { id } = req.params;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  // In real scenario, you'd restrict this to the logged-in user or admin
  res.json({ id: user.id, username: user.username, email: user.email, role: user.role });
};

// Update profile
exports.updateProfile = (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  if (username) user.username = username;
  if (email) user.email = email;

  res.status(200).json({ message: 'Profile updated', user });
};

