const { users } = require('../data/fakeDb');

// In a real app, you would hash passwords, generate tokens, etc.
exports.register = (req, res) => {
  const { username, email, password, role } = req.body;

  // Very naive checks
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  // Check if user already exists
  const existing = users.find(u => u.email === email);
  if (existing) {
    return res.status(409).json({ error: 'User already registered' });
  }

  // In-memory ID generation
  const newUser = {
    id: (users.length + 1).toString(),
    username,
    email,
    password, // plain text for demonstration
    role: role || 'user'
  };
  users.push(newUser);

  res.status(201).json({
    message: 'Registration successful',
    user: { id: newUser.id, username: newUser.username, role: newUser.role }
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  // Minimal check
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Fake token or session
  const fakeToken = `faketoken-${Math.random().toString(36).substring(2, 10)}`;

  res.status(200).json({
    message: 'Login successful',
    user: { id: user.id, username: user.username, role: user.role },
    token: fakeToken
  });
};

