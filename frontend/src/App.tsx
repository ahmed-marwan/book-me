import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import BookScreen from './screens/BookScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import MyBooksScreen from './screens/MyBooksScreen';
import BookEditScreen from './screens/BookEditScreen';

function App() {
  return (
    <Router>
      <Header />

      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/books/:id" component={BookScreen} />
          <Route path="/register" component={RegisterScreen} />
          <Route path="/login" component={LoginScreen} />
          <Route path="/profile" component={ProfileScreen} />
          <Route path="/mybooks" component={MyBooksScreen} />
          <Route path="/book/:id/edit" component={BookEditScreen} />
          <Route path="/book/create" component={BookEditScreen} exact />
        </Container>
      </main>

      <Footer />
    </Router>
  );
}

export default App;
