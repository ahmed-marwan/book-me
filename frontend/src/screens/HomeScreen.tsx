import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import Book from '../components/Book';

export interface BookDefinition {
  id: number;
  title: string;
  author: string;
  description: string;
  image: string;
  genre: string;
  owner: string;
  isAvailable: boolean;
}

function HomeScreen() {
  const [books, setBooks] = useState<BookDefinition[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const { data: books } = await axios.get<BookDefinition[]>('/api/books');

        setBooks(books);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBooks();
  }, []);

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
