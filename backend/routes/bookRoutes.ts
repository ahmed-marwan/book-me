import express from 'express';
import Book from '../models/bookModel';
import auth from '../middleware/auth';

const router = express.Router();

/**
 * @desc   Fetch all books
 * @route  GET /api/books
 * @access Public
 */
router.get('/', async (req, res) => {
  try {
    const books = await Book.find({});

    res.send(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @desc   Fetch user's list of books
 * @route  GET /api/books/mybooks
 * @access Private
 */
router.get('/mybooks', auth, async (req, res) => {
  try {
    const myBooks = await Book.find({ owner: req.authUser._id });
    
    res.send(myBooks);
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @desc   Fetch single book
 * @route  GET /api/books/:id
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).send({ message: 'Book not found!' });

    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
