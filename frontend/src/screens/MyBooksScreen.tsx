import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

import { RootState } from '../state/reducers/rootReducer';
import { MyBooksState } from '../state/types/myBooksTypes';
import { fetchMyBooks } from '../state/actions/myBooksActions';

function MyBooksScreen() {
  const dispatch = useDispatch();

  const { pending, myBooks, error } = useSelector<RootState, MyBooksState>(
    (state) => state.myBooks
  );

  useEffect(() => {
    dispatch(fetchMyBooks());
  }, [dispatch]);

  const uploadBookHandler = () => {
    console.log('upload book logic');
  };

  const deleteHandler = (id: string) => {
    if (window.confirm('Are you sure?!')) {
      // Delete book
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
          <Button onClick={uploadBookHandler}>
            <i className="fas fa-plus"></i> Upload Book
          </Button>
        </Col>
      </Row>

      {pending && <Loader />}
      {error && <Message variant="danger">{error}</Message>}

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
                <LinkContainer to={`/books/${book._id}/edit`}>
                  <OverlayTrigger
                    placement="left"
                    overlay={
                      <Tooltip id="edit-book-info">Edit Book Info</Tooltip>
                    }
                  >
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </OverlayTrigger>
                </LinkContainer>

                <OverlayTrigger
                  placement="right"
                  overlay={<Tooltip id="edit-book-info">Delete Book</Tooltip>}
                >
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(book._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </OverlayTrigger>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default MyBooksScreen;
