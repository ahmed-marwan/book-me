import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/rootReducer';
import { bookListInitialState } from './reducers/booksListReducer';
import { bookDetailsinitialState } from './reducers/bookDetailsReducer';
import { userLoginInitialState } from './reducers/userLoginReducer';
import { UserState } from './types/userLoginTypes';
import { myBooksInitialState } from './reducers/myBooksReducer';
import { MyBooksState } from './types/myBooksTypes';

const getUserFromStorage = () => {
  let userInfoFromStorage = localStorage.getItem('userInfo');
  if (!userInfoFromStorage) return userLoginInitialState;

  return {
    ...userLoginInitialState,
    userInfo: JSON.parse(userInfoFromStorage),
  } as UserState;
};

const getMyBooksFromStorage = () => {
  let myBooksFromStorage = localStorage.getItem('myBooks');
  if (!myBooksFromStorage) return myBooksInitialState;

  return {
    ...myBooksInitialState,
    myBooks: JSON.parse(myBooksFromStorage),
  } as MyBooksState;
};

const initialState = {
  booksList: bookListInitialState,
  bookDetails: bookDetailsinitialState,
  userLogin: getUserFromStorage(),
  myBooks: getMyBooksFromStorage(),
};

let middlewares = applyMiddleware(...[thunk]);

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(middlewares)
);

export default store;
