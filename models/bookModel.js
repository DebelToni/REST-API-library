const { books, nextBookId } = require('../data');

// Find all books
function findAllBooks() {
  return books;
}

// Find book by id
function findBookById(id) {
  return books.find(b => b.id === Number(id));
}

// Create new book
function createBook(bookData) {
  bookData.id = nextBookId;
  books.push(bookData);
  return bookData;
}

// Update book
function updateBook(book, updates) {
  Object.assign(book, updates);
  return book;
}

// Remove book
function removeBook(id) {
  const index = books.findIndex(b => b.id === Number(id));
  if (index !== -1) {
    books.splice(index, 1);
    return true;
  }
  return false;
}

module.exports = {
  findAllBooks,
  findBookById,
  createBook,
  updateBook,
  removeBook
};

