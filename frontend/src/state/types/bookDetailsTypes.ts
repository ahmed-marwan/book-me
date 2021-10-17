import { IBook } from '../../models/IBook';
import { bookDetailsActionTypes } from '../action-types/bookDetailsActionTypes';

export interface BookDetailsState {
  pending: boolean;
  book: IBook;
  error: string | null;
}

export type BookDetailsRequest = {
  type: typeof bookDetailsActionTypes.BOOK_DETAILS_REQUEST;
};

export type BookDetailsSuccess = {
  type: typeof bookDetailsActionTypes.BOOK_DETAILS_SUCCESS;
  payload: IBook;
};

export type BookDetailsFailure = {
  type: typeof bookDetailsActionTypes.BOOK_DETAILS_FAILURE;
  payload: string | null;
};

export type BookDetailsActions =
  | BookDetailsRequest
  | BookDetailsSuccess
  | BookDetailsFailure;
