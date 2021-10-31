import { Action, Dispatch } from 'redux';
import axios from 'axios';
import { bookCreateActionTypes } from '../action-types/bookCreateActionTypes';
import { BookCreateActions } from '../types/bookCreateTypes';
import { RootState } from '../reducers/index/rootReducer';
import { ThunkAction } from 'redux-thunk';
import { IBook } from '../../models/IBook';

export const createBook =
  (book: IBook): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch: Dispatch<BookCreateActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: bookCreateActionTypes.BOOK_CREATE_REQUEST,
      });

      const { token } = getState().userLogin.userInfo;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post<IBook>(`/api/books`, book, config);

      dispatch({
        type: bookCreateActionTypes.BOOK_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: bookCreateActionTypes.BOOK_CREATE_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
