const { books, reservations, borrowedHistory } = require('../data/fakeDb');

// List or search books
exports.getAllBooks = (req, res) => {
  const { search } = req.query;
  if (search) {
    const filtered = books.filter(
      b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.author.toLowerCase().includes(search.toLowerCase()) ||
        b.isbn.toLowerCase().includes(search.toLowerCase())
    );
    return res.json(filtered);
  }
  res.json(books);
};

// Get one book by ID
exports.getBookById = (req, res) => {
  const { id } = req.params;
  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }
  res.json(book);
};

// Add new book
exports.addBook = (req, res) => {
  const { title, description, author, year, isbn, quantity } = req.body;

  if (!title || !author || !isbn) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // In-memory ID generation
  const newBook = {
    id: (books.length + 1).toString(),
    title,
    description: description || '',
    author,
    year: year || null,
    isbn,
    quantity: quantity !== undefined ? quantity : 1,
    borrowedBy: []
  };

  books.push(newBook);
  res.status(201).json({ message: 'Book added', book: newBook });
};

// Update book
exports.updateBook = (req, res) => {
  const { id } = req.params;
  const { title, description, author, year, isbn, quantity } = req.body;

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (title !== undefined) book.title = title;
  if (description !== undefined) book.description = description;
  if (author !== undefined) book.author = author;
  if (year !== undefined) book.year = year;
  if (isbn !== undefined) book.isbn = isbn;
  if (quantity !== undefined) book.quantity = quantity;

  res.status(200).json({ message: 'Book updated', book });
};

// Delete book
exports.deleteBook = (req, res) => {
  const { id } = req.params;
  const index = books.findIndex(b => b.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }
  books.splice(index, 1);
  res.status(200).json({ message: `Book ${id} deleted` });
};

// Borrow a book
exports.borrowBook = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  if (book.quantity < 1) {
    return res.status(409).json({ error: 'No copies available, try reserving.' });
  }

  // Borrow book
  book.quantity--;
  book.borrowedBy.push(userId);

  borrowedHistory.push({
    userId,
    bookId: book.id,
    borrowedAt: new Date(),
    returnedAt: null
  });

  res.status(200).json({ message: `User ${userId} borrowed book ${id}` });
};

// Return a book
exports.returnBook = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  const borrowedIndex = book.borrowedBy.indexOf(userId);
  if (borrowedIndex === -1) {
    return res.status(409).json({ error: 'This user did not borrow this book' });
  }

  // Return book
  book.quantity++;
  book.borrowedBy.splice(borrowedIndex, 1);

  // Update borrowedHistory
  const record = borrowedHistory.find(
    r => r.bookId === id && r.userId === userId && !r.returnedAt
  );
  if (record) {
    record.returnedAt = new Date();
  }

  res.status(200).json({ message: `User ${userId} returned book ${id}` });
};

// Reserve a book
exports.reserveBook = (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ error: 'Missing userId' });
  }

  const book = books.find(b => b.id === id);
  if (!book) {
    return res.status(404).json({ error: 'Book not found' });
  }

  // Check if user already reserved
  const alreadyReserved = reservations.find(
    r => r.bookId === book.id && r.userId === userId
  );
  if (alreadyReserved) {
    return res.status(409).json({ error: 'Book is already reserved by this user' });
  }

  reservations.push({ userId, bookId: id });
  res.status(200).json({
    message: `User ${userId} reserved book ${id} successfully`
  });
};

// Overdue books (fake logic here)
exports.getOverdueBooks = (req, res) => {
  // We have no real due date, so just return those with borrowedAt older than X days, for example:
  const now = new Date();
  const overdueList = borrowedHistory.filter(record => {
    if (!record.returnedAt) {
      const borrowedTime = new Date(record.borrowedAt).getTime();
      const differenceInDays = (now.getTime() - borrowedTime) / (1000 * 3600 * 24);
      // Let's say more than 7 days is "overdue" in this fake scenario
      return differenceInDays > 7;
    }
    return false;
  });

  res.json(overdueList);
};

// Barcode scanning (fake)
exports.barcodeScan = (req, res) => {
  const { barcodeData } = req.body;
  if (!barcodeData) {
    return res.status(400).json({ error: 'Missing barcodeData' });
  }

  // Pretend we look up the ISBN from the barcode
  const found = books.find(b => b.isbn === barcodeData);
  if (found) {
    return res.json({ message: 'Book already exists', book: found });
  }

  // Create new book from barcode? (dummy logic)
  const newBook = {
    id: (books.length + 1).toString(),
    title: `Fake Book from Barcode ${barcodeData}`,
    description: '',
    author: 'Unknown',
    year: null,
    isbn: barcodeData,
    quantity: 1,
    borrowedBy: []
  };
  books.push(newBook);

  res.status(201).json({
    message: `Book created from barcode ${barcodeData}`,
    book: newBook
  });
};

