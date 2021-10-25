import { IUser } from '../../models/IUser';
import { userUpdateProfileActionTypes } from '../action-types/userActionTypes';

export interface UserProfileState {
  pending: boolean;
  userProfile: IUser;
  error: string | null;
}

export type UserUpdateProfileRequest = {
  type: typeof userUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST;
};

export type UserUpdateProfileSuccess = {
  type: typeof userUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS;
  payload: IUser;
};

export type UserUpdateProfileFailure = {
  type: typeof userUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE;
  payload: string | null;
};

export type UserUpdateProfileReset = {
  type: typeof userUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET;
};

export type UserUpdateProfileActions =
  | UserUpdateProfileRequest
  | UserUpdateProfileSuccess
  | UserUpdateProfileFailure
  | UserUpdateProfileReset;
