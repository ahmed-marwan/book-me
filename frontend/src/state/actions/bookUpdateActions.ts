import { Action, Dispatch } from 'redux';
import axios from 'axios';
import { bookUpdateActionTypes } from '../action-types/bookUpdateActionTypes';
import { BookUpdateActions } from '../types/bookUpdateTypes';
import { RootState } from '../reducers/index/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { IBook } from '../../models/IBook';

export const updateBook =
  (book: IBook): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch: Dispatch<BookUpdateActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: bookUpdateActionTypes.BOOK_UPDATE_REQUEST,
      });

      const { token } = getState().userLogin.userInfo;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.patch<IBook>(
        `/api/books/${book._id}`,
        book,
        config
      );

      dispatch({
        type: bookUpdateActionTypes.BOOK_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: bookUpdateActionTypes.BOOK_UPDATE_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
