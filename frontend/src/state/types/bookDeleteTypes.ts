import { bookDeleteActionTypes } from '../action-types/bookDeleteActionTypes';

export interface BookDeleteState {
  pending: boolean;
  book: string;
  error: string | null;
  success: boolean;
}

export type BookDeleteRequest = {
  type: typeof bookDeleteActionTypes.BOOK_DELETE_REQUEST;
};

export type BookDeleteSuccess = {
  type: typeof bookDeleteActionTypes.BOOK_DELETE_SUCCESS;
};

export type BookDeleteFailure = {
  type: typeof bookDeleteActionTypes.BOOK_DELETE_FAILURE;
  payload: string | null;
};

export type BookDeleteActions =
  | BookDeleteRequest
  | BookDeleteSuccess
  | BookDeleteFailure;
