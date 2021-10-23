import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { IBook } from '../models/IBook';

interface BookProps {
  book: IBook;
}

function Book({ book }: BookProps) {
  return (
    <Card className="my-3 rounded">
      <Link to={`/books/${book._id}`}>
        <Card.Img
          src={book.image}
          variant="top"
          style={{ maxHeight: '460px' }}
        />
      </Link>

      <Card.Body className="text-center">
        <Link to={`/books/${book._id}`}>
          <Card.Title>
            <strong>{book.title}</strong>
          </Card.Title>
        </Link>

        <Card.Text>{book.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Book;
