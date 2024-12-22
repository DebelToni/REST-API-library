const {
  findAllBooks,
  findBookById,
  createBook,
  updateBook,
  removeBook
} = require('../models/bookModel');
const { nextBookId } = require('../data');

// GET /books (list or search)
exports.getAllBooks = (req, res) => {
  // Minimal implementation, ignoring actual search queries
  const books = findAllBooks();
  return res.status(200).json(books);
};

// GET /books/:id
exports.getBookDetails = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  return res.status(200).json(book);
};

// POST /books (librarian)
exports.addBook = (req, res) => {
  const { title, description, author, year, isbn, quantity } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: 'Missing title or author' });
  }
  const newBook = createBook({
    title,
    description,
    author,
    year,
    isbn,
    quantity: quantity || 1
  });
  // in-memory: increment nextBookId
  nextBookId++;

  return res.status(201).json({
    message: 'Book added successfully',
    book: newBook
  });
};

// PUT /books/:id (librarian)
exports.updateBookInfo = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  const updated = updateBook(book, req.body);
  return res.status(200).json({ message: 'Book updated', book: updated });
};

// DELETE /books/:id (librarian)
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const success = removeBook(id);
  if (!success) {
    return res.status(404).json({ message: 'Book not found' });
  }
  return res.status(200).json({ message: 'Book deleted' });
};

/**
 * Borrow a book
 * POST /books/:id/borrow
 */
exports.borrowBook = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  if (book.quantity < 1) {
    return res.status(409).json({ message: 'No copies available to borrow' });
  }

  // reduce quantity
  book.quantity -= 1;
  // add to user’s borrowed list
  req.user.borrowedBooks.push(book.id);

  return res.status(200).json({
    message: 'Book borrowed successfully',
    book
  });
};

/**
 * Return a book
 * POST /books/:id/return
 */
exports.returnBook = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }

  const borrowedIndex = req.user.borrowedBooks.findIndex(b => b === book.id);
  if (borrowedIndex === -1) {
    return res.status(400).json({ message: 'User did not borrow this book' });
  }

  // Increase quantity
  book.quantity += 1;
  // Remove from user’s borrowed list
  req.user.borrowedBooks.splice(borrowedIndex, 1);

  return res.status(200).json({
    message: 'Book returned successfully',
    book
  });
};

/**
 * Reserve a book
 * POST /books/:id/reserve
 */
exports.reserveBook = (req, res) => {
  const { id } = req.params;
  const book = findBookById(id);
  if (!book) {
    return res.status(404).json({ message: 'Book not found' });
  }
  // Add to user’s reservedBooks if not already borrowed
  // Additional logic could check if the user has already borrowed it, etc.
  if (req.user.reservedBooks.includes(book.id)) {
    return res.status(409).json({ message: 'Book already reserved' });
  }
  req.user.reservedBooks.push(book.id);
  
  return res.status(200).json({
    message: 'Book reserved. You will be notified when it’s available.',
    book
  });
};

/**
 * Overdue books - simplified
 * GET /books/overdue
 * In a real app, you’d check the borrowing date. Here, we’ll just respond with an empty array.
 */
exports.getOverdueBooks = (req, res) => {
  // Minimal placeholder
  return res.status(200).json([]);
};

