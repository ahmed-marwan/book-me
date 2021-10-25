import { Action, Dispatch } from 'redux';
import axios from 'axios';
import { userUpdateProfileActionTypes } from '../action-types/userActionTypes';
import { UserUpdateProfileActions } from '../types/userUpdateProfileTypes';
import { IUser } from '../../models/IUser';
import { RootState } from '../reducers/rootReducer';
import { ThunkAction } from 'redux-thunk';

export const updateUserProfile =
  (
    name: string,
    email: string,
    password: string
  ): ThunkAction<void, RootState, null, Action<string>> =>
  async (
    dispatch: Dispatch<UserUpdateProfileActions>,
    getState: () => RootState
  ) => {
    try {
      dispatch({
        type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST,
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
      const { data } = await axios.patch<IUser>(
        `/api/users/profile`,
        { name, email, password },
        config
      );

      dispatch({
        type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: userUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
