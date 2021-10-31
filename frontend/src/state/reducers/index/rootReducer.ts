import { combineReducers } from 'redux';
import booksListReducer from '../booksListReducer';
import bookDetailsReducer from '../bookDetailsReducer';
import userLoginReducer from '../userLoginReducer';
import userRegisterReducer from '../userRegisterReducer';
import userDetailsReducer from '../userDetailsReducer';
import userUpdateProfileReducer from '../userUpdateProfileReducer';
import myBooksReducer from '../myBooksReducer';
import bookDeleteReducer from '../bookDeleteReducer';
import bookCreateReducer from '../bookCreateReducer';
import bookUpdateReducer from '../bookUpdateReducer';

const rootReducer = combineReducers({
  booksList: booksListReducer,
  bookDetails: bookDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  myBooks: myBooksReducer,
  bookDelete: bookDeleteReducer,
  bookCreate: bookCreateReducer,
  bookUpdate: bookUpdateReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
