import { Dispatch } from 'redux';
import axios from 'axios';
import { bookDetailsActionTypes } from '../action-types/bookDetailsActionTypes';
import { BookDetailsActions } from '../types/bookDetailsTypes';
import { IBook } from '../../models/IBook';

export const fetchBookDetails =
  (id: string) => async (dispatch: Dispatch<BookDetailsActions>) => {
    try {
      dispatch({
        type: bookDetailsActionTypes.BOOK_DETAILS_REQUEST,
      });

      const { data } = await axios.get<{ book: IBook; ownerName: string }>(
        `/api/books/${id}`
      );

      dispatch({
        type: bookDetailsActionTypes.BOOK_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: bookDetailsActionTypes.BOOK_DETAILS_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
