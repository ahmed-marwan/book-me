import { IUser } from '../../models/IUser';
import { userDetailsActionTypes } from '../action-types/userActionTypes';

export interface UserDetailsState {
  pending: boolean;
  userDetails: IUser;
  error: string | null;
}

export type UserDetailsRequest = {
  type: typeof userDetailsActionTypes.USER_DETAILS_REQUEST;
};

export type UserDetailsSuccess = {
  type: typeof userDetailsActionTypes.USER_DETAILS_SUCCESS;
  payload: IUser;
};

export type UserDetailsFailure = {
  type: typeof userDetailsActionTypes.USER_DETAILS_FAILURE;
  payload: string | null;
};

export type UserDetailsActions =
  | UserDetailsRequest
  | UserDetailsSuccess
  | UserDetailsFailure;
