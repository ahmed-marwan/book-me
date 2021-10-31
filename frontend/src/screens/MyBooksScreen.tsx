import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Row,
  Col,
  Table,
  Button,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Message from '../components/Message';
import Loader from '../components/Loader';

import { RootState } from '../state/reducers/index/rootReducer';
import { MyBooksState } from '../state/types/myBooksTypes';
import { fetchMyBooks } from '../state/actions/myBooksActions';
import { BookDeleteState } from '../state/types/bookDeleteTypes';
import { deleteBook } from '../state/actions/bookDeleteActions';

function MyBooksScreen() {
  const dispatch = useDispatch();

  const { pending, myBooks, error } = useSelector<RootState, MyBooksState>(
    (state) => state.myBooks
  );

  const {
    pending: pendingBookDelete,
    success: successBookDelete,
    error: errorBookDelete,
  } = useSelector<RootState, BookDeleteState>((state) => state.bookDelete);

  useEffect(() => {
    dispatch(fetchMyBooks());
  }, [dispatch, successBookDelete]);

  const deleteBookHandler = (id: string, isAvailable: boolean) => {
    if (!isAvailable) return window.alert('Book is currently booked!');

    if (window.confirm('Are you sure?!')) {
      dispatch(deleteBook(id));
    }
  };

  return (
    <>
      <Row className="my-4">
        <Col style={{ display: 'flex' }}>
          <h1>
            {myBooks.length ? <strong>My Books</strong> : 'Start Sharing ;-)'}
          </h1>
        </Col>

        <Col style={{ display: 'flex', justifyContent: 'end' }}>
          <Link to="/book/create" className="btn btn-primary my-3">
            <i className="fas fa-plus"></i> Upload Book
          </Link>
        </Col>
      </Row>

      {pendingBookDelete && <Loader />}
      {errorBookDelete && <Message variant="danger">{errorBookDelete}</Message>}
      {successBookDelete && <Message variant="success">Book Deleted</Message>}

      {pending ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table bordered striped hover responsive="true">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>AUTHOR</th>
              <th>GENRE</th>
              <th>STATUS</th>
              <th className="text-center">BORROWER</th>
              <th className="text-center">EXPECTED RETURN DATE</th>
            </tr>
          </thead>
          <tbody>
            {myBooks.map((book) => (
              <tr key={book._id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.isAvailable ? 'Available' : 'Borrowed'}</td>
                <td className="text-center">
                  {!book.isAvailable ? 'Borrower Name' : '--'}
                </td>
                <td className="text-center">
                  {!book.isAvailable ? 'DD/MM/YY' : '--'}
                </td>

                <td className="text-center">
                  <OverlayTrigger
                    placement="left"
                    overlay={
                      <Tooltip id="edit-book-info">Edit Book Info</Tooltip>
                    }
                  >
                    <LinkContainer to={`/book/${book._id}/edit`}>
                      <Button variant="light" className="btn-sm">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="right"
                    overlay={<Tooltip id="edit-book-info">Delete Book</Tooltip>}
                  >
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() =>
                        deleteBookHandler(book._id!, book.isAvailable!)
                      }
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </OverlayTrigger>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}

export default MyBooksScreen;
