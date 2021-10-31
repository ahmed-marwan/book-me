import express, { Request, Response } from 'express';
import Book, { IBook } from '../models/bookModel';
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

/**
 * @desc   Delete a single book
 * @route  DELETE /api/books/:id
 * @access Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({
      _id: req.params.id,
      owner: req.authUser._id,
    });

    if (!book) return res.status(404).send();

    res.send({ message: 'Book removed' });
  } catch (error) {
    res.status(500).send(error);
  }
});

/**
 * @desc   Create a book
 * @route  POST/api/books
 * @access Private
 */
router.post('/', auth, async (req: Request, res: Response) => {
  const newBook = new Book({ ...req.body, owner: req.authUser._id });

  try {
    await newBook.save();
    res.status(201).send(newBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

/**
 * @desc   Update a book
 * @route  PATCH /api/books/:id
 * @access Private
 */
router.patch('/:id', auth, async (req: Request, res: Response) => {
  const updates = Object.keys(req.body);

  try {
    const updatedBook = await Book.findOne({
      _id: req.params.id,
      owner: req.authUser._id,
    });

    if (!updatedBook) return res.status(404).send();

    //@ts-ignore
    updates.forEach((update) => (updatedBook[update] = req.body[update]));

    await updatedBook.save();

    res.send(updatedBook);
  } catch (error) {
    res.status(400).send(error);
  }
});

export default router;
