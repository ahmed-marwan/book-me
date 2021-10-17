import { IBook } from '../../models/IBook';
import { booksListActionTypes } from '../action-types/booksListActionTypes';

export interface BooksListState {
  pending: boolean;
  books: IBook[];
  error: string | null;
}

export type BooksListRequest = {
  type: typeof booksListActionTypes.BOOKS_LIST_REQUEST;
};

export type BooksListSuccess = {
  type: typeof booksListActionTypes.BOOKS_LIST_SUCCESS;
  payload: IBook[];
};

export type BooksListFailure = {
  type: typeof booksListActionTypes.BOOKS_LIST_FAILURE;
  payload: string | null;
};

export type BooksListActions =
  | BooksListRequest
  | BooksListSuccess
  | BooksListFailure;
