import { bookCreateActionTypes } from '../action-types/bookCreateActionTypes';
import { BookCreateActions, BookCreateState } from '../types/bookCreateTypes';

const bookSample = {
  _id: '',
  title: '',
  author: '',
  description: '',
  image: '',
  genre: '',
  owner: '',
  isAvailable: false,
};

export const bookCreateInitialState: BookCreateState = {
  pending: false,
  book: bookSample,
  error: null,
  success: false,
};

const bookCreateReducer = (
  state = bookCreateInitialState,
  action: BookCreateActions
) => {
  switch (action.type) {
    case bookCreateActionTypes.BOOK_CREATE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case bookCreateActionTypes.BOOK_CREATE_SUCCESS:
      return {
        ...state,
        pending: false,
        book: action.payload,
        success: true,
      };
    case bookCreateActionTypes.BOOK_CREATE_FAILURE:
      return {
        ...state,
        pending: false,
        book: bookSample,
        error: action.payload,
      };

    case bookCreateActionTypes.BOOK_CREATE_RESET:
      return {
        ...state,
        pending: false,
        success: false,
        book: bookSample,
      };

    default:
      return state;
  }
};

export default bookCreateReducer;
