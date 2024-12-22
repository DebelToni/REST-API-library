const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');

// Get all books or search
router.get('/', bookController.getAllBooks);

// Get a specific book by ID
router.get('/:id', bookController.getBookById);

// Add a new book (librarian only in real app)
router.post('/', bookController.addBook);

// Update book info
router.put('/:id', bookController.updateBook);

// Remove a book
router.delete('/:id', bookController.deleteBook);

// Borrow a book
router.post('/:id/borrow', bookController.borrowBook);

// Return a book
router.post('/:id/return', bookController.returnBook);

// Reserve a book
router.post('/:id/reserve', bookController.reserveBook);

// Overdue books
router.get('/overdue/list', bookController.getOverdueBooks);

// Barcode scanning (fake)
router.post('/barcode-scan', bookController.barcodeScan);

module.exports = router;

