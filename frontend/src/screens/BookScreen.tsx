import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Button,
  ListGroupItem,
} from 'react-bootstrap';

import { RootState } from '../state/reducers/rootReducer';
import { BookDetailsState } from '../state/types/bookDetailsTypes';
import { fetchBookDetails } from '../state/actions/bookDetailsActions';

import Loader from '../components/Loader';
import Message from '../components/Message';

function BookScreen() {
  const dispatch = useDispatch();

  const { pending, book, error } = useSelector<RootState, BookDetailsState>(
    (state) => state.bookDetails
  );
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    dispatch(fetchBookDetails(id));
  }, [dispatch, id]);

  return (
    <>
      <Link to="/" className="btn btn-primary my-3">
        Go Back
      </Link>
      {pending ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
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
      )}
    </>
  );
}

export default BookScreen;
