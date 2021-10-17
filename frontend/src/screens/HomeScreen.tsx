import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { RootState } from '../state/reducers/rootReducer';
import { BooksListState } from '../state/types/booksListTypes';
import { fetchBooksList } from '../state/actions/booksListActions';
import Book from '../components/Book';
import Loader from '../components/Loader';
import Message from '../components/Message';

function HomeScreen() {
  const dispatch = useDispatch();

  const { pending, books, error } = useSelector<RootState, BooksListState>(
    (state) => state.booksList
  );

  useEffect(() => {
    dispatch(fetchBooksList());
  }, [dispatch]);

  return (
    <>
      <h1>Explore Available Books</h1>

      <Row>
        {pending ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          books.map((book) => {
            return (
              <Col sm={12} md={6} lg={4} xl={3} key={book._id}>
                <Book book={book} />
              </Col>
            );
          })
        )}
      </Row>
    </>
  );
}

export default HomeScreen;
