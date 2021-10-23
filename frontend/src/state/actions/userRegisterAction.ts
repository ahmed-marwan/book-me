import { Dispatch } from 'redux';
import axios from 'axios';
import { userRegisterActionTypes } from '../action-types/userActionTypes';
import { UserRegisterActions } from '../types/userRegisterTypes';
import { UserLoginActions } from '../types/userLoginTypes';
import { userLoginActionTypes } from '../action-types/userActionTypes';
import { IUser } from '../../models/IUser';

export const registerUser =
  (name: string, email: string, password: string) =>
  async (dispatch: Dispatch<UserRegisterActions | UserLoginActions>) => {
    try {
      dispatch({
        type: userRegisterActionTypes.USER_REGISTER_REQUEST,
      });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const { data } = await axios.post<IUser>(
        '/api/users',
        { name, email, password },
        config
      );

      dispatch({
        type: userRegisterActionTypes.USER_REGISTER_SUCCESS,
        payload: data,
      });

      dispatch({
        type: userLoginActionTypes.USER_LOGIN_SUCCESS,
        payload: data,
      });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: userRegisterActionTypes.USER_REGISTER_FAILURE,
        //@ts-ignore
        payload: error.message,
      });
    }
  };
