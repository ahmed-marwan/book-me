import { IBook } from '../../models/IBook';
import { bookUpdateActionTypes } from '../action-types/bookUpdateActionTypes';

export interface BookUpdateState {
  pending: boolean;
  book: IBook;
  error: string | null;
  success: boolean;
}

export type BookUpdateRequest = {
  type: typeof bookUpdateActionTypes.BOOK_UPDATE_REQUEST;
};

export type BookUpdateSuccess = {
  type: typeof bookUpdateActionTypes.BOOK_UPDATE_SUCCESS;
  payload: IBook;
};

export type BookUpdateFailure = {
  type: typeof bookUpdateActionTypes.BOOK_UPDATE_FAILURE;
  payload: string | null;
};

export type BookUpdateReset = {
  type: typeof bookUpdateActionTypes.BOOK_UPDATE_RESET;
};

export type BookUpdateActions =
  | BookUpdateRequest
  | BookUpdateSuccess
  | BookUpdateFailure
  | BookUpdateReset;
