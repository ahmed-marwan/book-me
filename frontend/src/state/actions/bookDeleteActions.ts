import { Action, Dispatch } from 'redux';
import axios from 'axios';
import { bookDeleteActionTypes } from '../action-types/bookDeleteActionTypes';
import { BookDeleteActions } from '../types/bookDeleteTypes';
import { RootState } from '../reducers/index/rootReducer';
import { ThunkAction } from 'redux-thunk';

export const deleteBook =
  (id: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch: Dispatch<BookDeleteActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: bookDeleteActionTypes.BOOK_DELETE_REQUEST,
      });

      const { token } = getState().userLogin.userInfo;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`/api/books/${id}`, config);

      dispatch({
        type: bookDeleteActionTypes.BOOK_DELETE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: bookDeleteActionTypes.BOOK_DELETE_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
