import { Action, Dispatch } from 'redux';
import axios from 'axios';
import { userDetailsActionTypes } from '../action-types/userActionTypes';
import { UserDetailsActions } from '../types/userDetailsTypes';
import { IUser } from '../../models/IUser';
import { RootState } from '../reducers/index/rootReducer';
import { ThunkAction } from 'redux-thunk';

export const getUserDetails =
  (id: string): ThunkAction<void, RootState, null, Action<string>> =>
  async (dispatch: Dispatch<UserDetailsActions>, getState: () => RootState) => {
    try {
      dispatch({
        type: userDetailsActionTypes.USER_DETAILS_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get<IUser>(`/api/users/${id}`, config);

      dispatch({
        type: userDetailsActionTypes.USER_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: userDetailsActionTypes.USER_DETAILS_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
