import { IBook } from '../../models/IBook';
import { myBooksActionTypes } from '../action-types/myBooksActionTypes';

export interface MyBooksState {
  pending: boolean;
  myBooks: IBook[];
  error: string | null;
}

export type MyBooksRequest = {
  type: typeof myBooksActionTypes.MY_BOOKS_REQUEST;
};

export type MyBooksSuccess = {
  type: typeof myBooksActionTypes.MY_BOOKS_SUCCESS;
  payload: IBook[];
};

export type MyBooksFailure = {
  type: typeof myBooksActionTypes.MY_BOOKS_FAILURE;
  payload: string | null;
};

export type MyBooksActions = MyBooksRequest | MyBooksSuccess | MyBooksFailure;
