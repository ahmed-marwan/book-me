import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams, useHistory, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';

import { RootState } from '../state/reducers/index/rootReducer';
import { BookDetailsState } from '../state/types/bookDetailsTypes';
import { fetchBookDetails } from '../state/actions/bookDetailsActions';
import { createBook } from '../state/actions/bookCreateActions';
import { BookUpdateState } from '../state/types/bookUpdateTypes';
import { updateBook } from '../state/actions/bookUpdateActions';

import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';
import Message from '../components/Message';

function BookEditScreen() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { pathname } = useLocation();

  const dispatch = useDispatch();

  const {
    pending,
    bookDetails: { book },
    error,
  } = useSelector<RootState, BookDetailsState>((state) => state.bookDetails);

  const {
    pending: pendingBookUpdate,
    success: successBookUpdate,
    error: errorBookUpdate,
  } = useSelector<RootState, BookUpdateState>((state) => state.bookUpdate);

  useEffect(() => {
    if (pathname !== '/book/create') {
      if (!book.title || book._id !== id) {
        dispatch(fetchBookDetails(id));
      } else {
        setTitle(book.title);
        setAuthor(book.author);
        setDescription(book.description);
        setGenre(book.genre);
        setImage(book.image);
      }
    }
  }, [
    book._id,
    book.author,
    book.description,
    book.genre,
    book.image,
    book.title,
    dispatch,
    id,
    pathname,
    successBookUpdate,
  ]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (pathname === '/book/create') {
      dispatch(createBook({ title, author, description, genre, image }));
    } else {
      dispatch(
        updateBook({ _id: id, title, author, description, genre, image })
      );
    }
    history.push('/mybooks');
  };

  const uploadFileHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];

      const formData = new FormData();
      formData.append('image', file);

      setUploading(true);

      try {
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        const { data } = await axios.post<string>(
          '/api/upload',
          formData,
          config
        );

        setImage(data);
        setUploading(false);
      } catch (error) {
        console.error(error);
        setUploading(false);
      }
    }
  };

  return (
    <>
      <Link to="/mybooks" className="btn  btn-primary my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>
          <strong>
            {pathname === '/book/create' ? 'Insert' : 'Edit'} Book
          </strong>
        </h1>

        {errorBookUpdate && <Message variant="danger">{error}</Message>}
        {pendingBookUpdate && <Loader />}

        {pending ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title" className="py-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter book title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="author" className="py-2">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter book author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="description" className="py-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter book description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="genre" className="py-2">
              <Form.Label>Genre</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter book genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="image" className="py-2">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>

              <Form.File
                id="image-file"
                custom
                onChange={uploadFileHandler}
                className="py-3"
              ></Form.File>
              {uploading && <Loader />}
            </Form.Group>

            <Button type="submit" variant="primary">
              {pathname === '/book/create' ? 'Create' : 'Update'}
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
}

export default BookEditScreen;
