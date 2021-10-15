import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from 'react-bootstrap';
import { BookDefinition } from './HomeScreen';

const initialBookState = {
  _id: '',
  title: '',
  author: '',
  description: '',
  image: '',
  genre: '',
  owner: '',
  isAvailable: false,
};

function BookScreen() {
  const [book, setBook] = useState(initialBookState);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const results = await axios.get(`/api/books/${id}`);
        const book = results.data as BookDefinition;

        setBook(book);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <Col md={3}>
          <Image src={book.image} alt="Book cover" fluid />
        </Col>

        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{book.title}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <p>{book.description}</p>
            </ListGroupItem>
          </ListGroup>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem className="py-3">
                  <Row>
                    <Col>Owner:</Col>
                    <Col>
                      <strong>{book.owner}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem className="py-3">
                  <Row>
                    <Col>Status:</Col>
                    <Col>{book.isAvailable ? 'Available' : 'Booked'}</Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem className="py-3">
                  <Button disabled={!book.isAvailable}>
                    Request To Borrow
                  </Button>
                </ListGroupItem>
              </ListGroup>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default BookScreen;
