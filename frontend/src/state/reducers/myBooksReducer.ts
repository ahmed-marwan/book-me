import { myBooksActionTypes } from '../action-types/myBooksActionTypes';
import { MyBooksState, MyBooksActions } from '../types/myBooksTypes';

export const myBooksInitialState: MyBooksState = {
  pending: false,
  myBooks: [],
  error: null,
};

const myBooksReducer = (
  state = myBooksInitialState,
  action: MyBooksActions
) => {
  switch (action.type) {
    case myBooksActionTypes.MY_BOOKS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case myBooksActionTypes.MY_BOOKS_SUCCESS:
      return {
        ...state,
        pending: false,
        myBooks: action.payload,
      };
    case myBooksActionTypes.MY_BOOKS_FAILURE:
      return {
        ...state,
        pending: false,
        myBooks: [],
        error: action.payload,
      };

    default:
      return state;
  }
};

export default myBooksReducer;
