import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

interface BookProps {
  book: {
    id: number;
    title: string;
    author: string;
    description: string;
    image: string;
    genre: string;
    owner: string;
    isAvailable: boolean;
  };
}

function Book({ book }: BookProps) {
  return (
    <Card className="my-3 rounded">
      <Link to={`/book/${book.id}`}>
        <Card.Img src={book.image} variant="top" />
      </Link>

      <Card.Body className="text-center">
        <Link to={`/book/${book.id}`}>
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
