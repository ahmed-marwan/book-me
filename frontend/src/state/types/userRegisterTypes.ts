import { IUser } from '../../models/IUser';
import { userRegisterActionTypes } from '../action-types/userActionTypes';

export interface UserState {
  pending: boolean;
  userInfo: IUser;
  error: string | null;
}

export type UserRegisterRequest = {
  type: typeof userRegisterActionTypes.USER_REGISTER_REQUEST;
};

export type UserRegisterSuccess = {
  type: typeof userRegisterActionTypes.USER_REGISTER_SUCCESS;
  payload: IUser;
};

export type UserRegisterFailure = {
  type: typeof userRegisterActionTypes.USER_REGISTER_FAILURE;
  payload: string | null;
};

export type UserRegisterActions =
  | UserRegisterRequest
  | UserRegisterSuccess
  | UserRegisterFailure;
