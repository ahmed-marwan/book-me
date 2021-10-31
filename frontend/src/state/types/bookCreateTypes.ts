import { IBook } from '../../models/IBook';
import { bookCreateActionTypes } from '../action-types/bookCreateActionTypes';

export interface BookCreateState {
  pending: boolean;
  book: IBook;
  error: string | null;
  success: boolean;
}

export type BookCreateRequest = {
  type: typeof bookCreateActionTypes.BOOK_CREATE_REQUEST;
};

export type BookCreateSuccess = {
  type: typeof bookCreateActionTypes.BOOK_CREATE_SUCCESS;
  payload: IBook;
};

export type BookCreateFailure = {
  type: typeof bookCreateActionTypes.BOOK_CREATE_FAILURE;
  payload: string | null;
};

export type BookCreateReset = {
  type: typeof bookCreateActionTypes.BOOK_CREATE_RESET;
};

export type BookCreateActions =
  | BookCreateRequest
  | BookCreateSuccess
  | BookCreateFailure
  | BookCreateReset;
