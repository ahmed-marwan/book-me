import express from 'express';
import Book from '../models/bookModel';

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
 * @desc   Fetch single book
 * @route  GET /api/books/:id
 * @access Public
 */
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    console.log(book);
    if (!book) return res.status(404).send({ message: 'Book not found!' });

    res.send(book);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
