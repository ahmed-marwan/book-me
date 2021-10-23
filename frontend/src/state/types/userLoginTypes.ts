import { IUser } from '../../models/IUser';
import { userLoginActionTypes } from '../action-types/userActionTypes';

export interface UserState {
  pending: boolean;
  userInfo: IUser;
  error: string | null;
}

export type UserLoginRequest = {
  type: typeof userLoginActionTypes.USER_LOGIN_REQUEST;
};

export type UserLoginSuccess = {
  type: typeof userLoginActionTypes.USER_LOGIN_SUCCESS;
  payload: IUser;
};

export type UserLoginFailure = {
  type: typeof userLoginActionTypes.USER_LOGIN_FAILURE;
  payload: string | null;
};

export type UserLogout = {
  type: typeof userLoginActionTypes.USER_LOGOUT;
};

export type UserLoginActions =
  | UserLoginRequest
  | UserLoginSuccess
  | UserLoginFailure
  | UserLogout;
