import { booksListActionTypes } from '../action-types/booksListActionTypes';
import { BooksListActions, BooksListState } from '../types/booksListTypes';

const initialState: BooksListState = {
  pending: false,
  books: [],
  error: null,
};

const booksListReducer = (state = initialState, action: BooksListActions) => {
  switch (action.type) {
    case booksListActionTypes.BOOKS_LIST_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case booksListActionTypes.BOOKS_LIST_SUCCESS:
      return {
        ...state,
        pending: false,
        books: action.payload,
      };
    case booksListActionTypes.BOOKS_LIST_FAILURE:
      return {
        ...state,
        pending: false,
        books: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default booksListReducer;
