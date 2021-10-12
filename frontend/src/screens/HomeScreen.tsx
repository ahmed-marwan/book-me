import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';
import { books } from '../books';

function HomeScreen() {
  return (
    <>
      <h1>Explore Available Books</h1>

      <Row>
        {books.map((book) => {
          return (
            <Col sm={12} md={6} lg={4} xl={3} key={book.id}>
              <Book book={book} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}

export default HomeScreen;
