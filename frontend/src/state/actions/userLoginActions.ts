import { Dispatch } from 'redux';
import axios from 'axios';
import { userLoginActionTypes } from '../action-types/userActionTypes';
import { UserLoginActions } from '../types/userLoginTypes';
import { IUser } from '../../models/IUser';

export const loginUser =
  (email: string, password: string) =>
  async (dispatch: Dispatch<UserLoginActions>) => {
    try {
      dispatch({
        type: userLoginActionTypes.USER_LOGIN_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<IUser>(
        '/api/users/login',
        { email, password },
        config
      );

      dispatch({
        type: userLoginActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: userLoginActionTypes.USER_LOGIN_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };

export const logoutUser = () => (dispatch: Dispatch<UserLoginActions>) => {
  localStorage.removeItem('userInfo');

  dispatch({ type: userLoginActionTypes.USER_LOGOUT });
};
