import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Row, Col, Form, Button } from 'react-bootstrap';

import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../state/actions/userDetailsAction';
import { RootState } from '../state/reducers/rootReducer';
import { UserDetailsState } from '../state/types/userDetailsTypes';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { pending, userDetails, error } = useSelector<
    RootState,
    UserDetailsState
  >((state) => state.userDetails);

  const history = useHistory();

  useEffect(() => {
    if (userDetails.name === '') {
      dispatch(getUserDetails('profile'));
    } else {
      setName(userDetails.name);
      setEmail(userDetails.email);
    }
  }, [history, userDetails.name, userDetails.email, dispatch]);

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Dispatch update profile action
    }
  };

  return (
    <Row>
      <Col md={4}>
        <h2>User Profile</h2>

        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {pending && <Loader />}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="py-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="name"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="py-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="py-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="py-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary">
            Update
          </Button>
        </Form>
      </Col>

      <Col md={8}>
        <h2>Books I Borrowed</h2>
      </Col>
    </Row>
  );
}

export default ProfileScreen;
