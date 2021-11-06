import { borrowRequestActionTypes } from '../action-types/borrowRequestActionTypes';
import {
  BorrowRequestActions,
  BorrowRequestState,
} from '../types/borrowRequestTypes';

const borrowRequestSample = {
  user: '',
  requestedBook: '',
  isDelivered: false,
  deliveredAt: new Date(),
  isReturned: false,
  returnedAt: new Date(),
};

export const borrowRequestInitialState: BorrowRequestState = {
  pending: false,
  borrowRequest: borrowRequestSample,
  error: null,
  success: false,
};

const borrowRequestReducer = (
  state = borrowRequestInitialState,
  action: BorrowRequestActions
) => {
  switch (action.type) {
    case borrowRequestActionTypes.CREATE_BORROW_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case borrowRequestActionTypes.BORROW_REQUEST_SUCCESS:
      return {
        ...state,
        pending: false,
        borrowRequest: action.payload,
        success: true,
      };
    case borrowRequestActionTypes.BORROW_REQUEST_FAILURE:
      return {
        ...state,
        pending: false,
        borrowRequest: borrowRequestSample,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default borrowRequestReducer;
