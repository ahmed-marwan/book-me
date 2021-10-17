import { bookDetailsActionTypes } from '../action-types/bookDetailsActionTypes';
import {
  BookDetailsActions,
  BookDetailsState,
} from '../types/bookDetailsTypes';

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

const initialState: BookDetailsState = {
  pending: false,
  book: bookSample,
  error: null,
};

const bookDetailsReducer = (
  state = initialState,
  action: BookDetailsActions
) => {
  switch (action.type) {
    case bookDetailsActionTypes.BOOK_DETAILS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case bookDetailsActionTypes.BOOK_DETAILS_SUCCESS:
      return {
        ...state,
        pending: false,
        book: action.payload,
      };
    case bookDetailsActionTypes.BOOK_DETAILS_FAILURE:
      return {
        ...state,
        pending: false,
        book: bookSample,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default bookDetailsReducer;
