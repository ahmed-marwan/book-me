import { Action, Dispatch } from 'redux';
import axios from 'axios';
import { borrowRequestActionTypes } from '../action-types/borrowRequestActionTypes';
import { BorrowRequestActions } from '../types/borrowRequestTypes';
import { IBorrowRequest } from '../../models/IBorrowRequest';
import { RootState } from '../reducers/index/rootReducer';
import { ThunkAction } from 'redux-thunk';

export const createBorrowRequest =
  (requestedBook: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (
    dispatch: Dispatch<BorrowRequestActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: borrowRequestActionTypes.CREATE_BORROW_REQUEST,
      });

      const { token } = getState().userLogin.userInfo;

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.post<IBorrowRequest>(
        '/api/borrow-requests',
        { requestedBook },
        config
      );

      dispatch({
        type: borrowRequestActionTypes.BORROW_REQUEST_SUCCESS,
        //@ts-ignore
        payload: data,
      });

      localStorage.setItem('borrowRequest', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: borrowRequestActionTypes.BORROW_REQUEST_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
