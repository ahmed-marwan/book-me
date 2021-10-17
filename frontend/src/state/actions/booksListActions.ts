import { Dispatch } from 'redux';
import axios from 'axios';
import { IBook } from '../../models/IBook';
import { booksListActionTypes } from '../action-types/booksListActionTypes';
import { BooksListActions } from '../types/booksListTypes';

export const fetchBooksList =
  () => async (dispatch: Dispatch<BooksListActions>) => {
    try {
      dispatch({
        type: booksListActionTypes.BOOKS_LIST_REQUEST,
      });

      const { data } = await axios.get<IBook[]>('/api/books');

      dispatch({
        type: booksListActionTypes.BOOKS_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: booksListActionTypes.BOOKS_LIST_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
