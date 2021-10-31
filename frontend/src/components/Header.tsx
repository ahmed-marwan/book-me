import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { RootState } from '../state/reducers/index/rootReducer';
import { UserState } from '../state/types/userLoginTypes';
import { logoutUser } from '../state/actions/userLoginActions';
import { useHistory } from 'react-router';

function Header() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector<RootState, UserState>(
    (state) => state.userLogin
  );

  const history = useHistory();

  const logoutHandler = () => {
    dispatch(logoutUser());

    history.push('/');
  };

  return (
    <header>
      <Navbar className="navbar navbar-expand-lg navbar-dark bg-primary">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <strong>Book Me</strong>
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav>
              <LinkContainer to="/mybooks">
                <Nav.Link>
                  <i className="fas fa-stream px-1"></i>My Books
                </Nav.Link>
              </LinkContainer>
              {userInfo.name !== '' ? (
                <NavDropdown title={userInfo.name} id="username">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user px-1"></i>Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
