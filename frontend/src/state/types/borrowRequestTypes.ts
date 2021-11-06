import { IBorrowRequest } from '../../models/IBorrowRequest';
import { borrowRequestActionTypes } from '../action-types/borrowRequestActionTypes';

export interface BorrowRequestState {
  pending: boolean;
  borrowRequest: IBorrowRequest;
  error: string | null;
  success: boolean;
}

export type CreateBorrowRequest = {
  type: typeof borrowRequestActionTypes.CREATE_BORROW_REQUEST;
};

export type BorrowRequestSuccess = {
  type: typeof borrowRequestActionTypes.BORROW_REQUEST_SUCCESS;
  payload: IBorrowRequest;
};

export type BorrowRequestFailure = {
  type: typeof borrowRequestActionTypes.BORROW_REQUEST_FAILURE;
  payload: string | null;
};


export type BorrowRequestActions =
  | CreateBorrowRequest
  | BorrowRequestSuccess
  | BorrowRequestFailure
