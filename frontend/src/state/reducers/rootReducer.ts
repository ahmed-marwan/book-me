import { combineReducers } from 'redux';
import booksListReducer from './booksListReducer';
import bookDetailsReducer from './bookDetailsReducer';
import userLoginReducer from './userLoginReducer';
import userRegisterReducer from './userRegisterReducer';

const rootReducer = combineReducers({
  booksList: booksListReducer,
  bookDetails: bookDetailsReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
