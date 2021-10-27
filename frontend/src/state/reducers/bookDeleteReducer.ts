import { bookDeleteActionTypes } from '../action-types/bookDeleteActionTypes';
import { BookDeleteActions, BookDeleteState } from '../types/bookDeleteTypes';

export const bookDeleteinitialState: BookDeleteState = {
  pending: false,
  book: '',
  error: null,
  success: false,
};

const bookDeleteReducer = (
  state = bookDeleteinitialState,
  action: BookDeleteActions
) => {
  switch (action.type) {
    case bookDeleteActionTypes.BOOK_DELETE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case bookDeleteActionTypes.BOOK_DELETE_SUCCESS:
      return {
        ...state,
        pending: false,
        success: true,
      };
    case bookDeleteActionTypes.BOOK_DELETE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default bookDeleteReducer;
