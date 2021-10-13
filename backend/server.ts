import express from 'express';
import dotenv from 'dotenv';
import { books } from './data/books';

dotenv.config();
const PORT = process.env.PORT || 5000;

const app = express();

app.get('/api/books', (req, res) => {
  res.send(books);
});

app.get('/api/books/:id', (req, res) => {
  const book = books.find((book) => book.id === +req.params.id);
  res.send(book);
});

app.listen(5000, () => {
  console.log(
    `Server is running on ${process.env.NODE_ENV} mode on port ${PORT}`
  );
});
