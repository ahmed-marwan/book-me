import { bookUpdateActionTypes } from '../action-types/bookUpdateActionTypes';
import { BookUpdateActions, BookUpdateState } from '../types/bookUpdateTypes';

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

export const bookUpdateInitialState: BookUpdateState = {
  pending: false,
  book: bookSample,
  error: null,
  success: false,
};

const bookUpdateReducer = (
  state = bookUpdateInitialState,
  action: BookUpdateActions
) => {
  switch (action.type) {
    case bookUpdateActionTypes.BOOK_UPDATE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case bookUpdateActionTypes.BOOK_UPDATE_SUCCESS:
      return {
        ...state,
        pending: false,
        book: action.payload,
        success: true,
      };
    case bookUpdateActionTypes.BOOK_UPDATE_FAILURE:
      return {
        ...state,
        pending: false,
        book: bookSample,
        error: action.payload,
      };

    case bookUpdateActionTypes.BOOK_UPDATE_RESET:
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

export default bookUpdateReducer;
