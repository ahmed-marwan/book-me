import { combineReducers } from 'redux';
import booksListReducer from './booksListReducer';
import bookDetailsReducer from './bookDetailsReducer';

const rootReducer = combineReducers({
  booksList: booksListReducer,
  bookDetails: bookDetailsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
