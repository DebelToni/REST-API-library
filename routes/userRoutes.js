const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Get all users
router.get('/', userController.getAllUsers);

// Get a user by id
router.get('/:id', userController.getUserById);

// Create a new user (in addition to /auth/register, for librarians)
router.post('/', userController.createUser);

// Update user
router.put('/:id', userController.updateUser);

// Delete user
router.delete('/:id', userController.deleteUser);

// Get or update profile (example usage: can be extended for real auth checks)
router.get('/:id/profile', userController.getProfile);
router.put('/:id/profile', userController.updateProfile);

module.exports = router;

