import React from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  ListGroupItem,
} from 'react-bootstrap';

import { books } from '../books';

function BookScreen() {
  const { id } = useParams<{ id: string }>();
  const matchedBook = books.find((book) => book.id === +id);

  return (
    <>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      <Row>
        <Col md={3}>
          <Image src={matchedBook?.image} alt="Book cover" fluid />
        </Col>

        <Col md={6}>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h3>{matchedBook?.title}</h3>
            </ListGroupItem>

            <ListGroupItem>
              <p>{matchedBook?.description}</p>
            </ListGroupItem>
          </ListGroup>
          <Row>
            <Col md={8}>
              <ListGroup variant="flush">
                <ListGroupItem className="py-3">
                  <Row>
                    <Col>Owner:</Col>
                    <Col>
                      <strong>{matchedBook?.owner}</strong>
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem className="py-3">
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {matchedBook?.isAvailable ? 'Available' : 'Booked'}
                    </Col>
                  </Row>
                </ListGroupItem>

                <ListGroupItem className="py-3">
                  <Button disabled={!matchedBook?.isAvailable}>
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
