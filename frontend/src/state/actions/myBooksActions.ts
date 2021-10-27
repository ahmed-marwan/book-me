import { Action, Dispatch } from 'redux';
import axios from 'axios';
import { IBook } from '../../models/IBook';
import { myBooksActionTypes } from '../action-types/myBooksActionTypes';
import { MyBooksActions } from '../types/myBooksTypes';
import { RootState } from '../reducers/rootReducer';
import { ThunkAction } from 'redux-thunk';

export const fetchMyBooks =
  (): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch: Dispatch<MyBooksActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: myBooksActionTypes.MY_BOOKS_REQUEST,
      });

      const { token } = getState().userLogin.userInfo;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get<IBook[]>('/api/books/mybooks', config);

      dispatch({
        type: myBooksActionTypes.MY_BOOKS_SUCCESS,
        payload: data,
      });

      localStorage.setItem('myBooks', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: myBooksActionTypes.MY_BOOKS_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
