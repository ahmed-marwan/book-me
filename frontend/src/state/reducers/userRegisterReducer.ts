import { userRegisterActionTypes } from '../action-types/userActionTypes';
import { UserRegisterActions, UserState } from '../types/userRegisterTypes';

const userSample = {
  _id: '',
  name: '',
  email: '',
  password: '',
  token: '',
};

export const userRegisterInitialState: UserState = {
  pending: false,
  userInfo: userSample,
  error: null,
};

const userRegisterReducer = (
  state = userRegisterInitialState,
  action: UserRegisterActions
) => {
  switch (action.type) {
    case userRegisterActionTypes.USER_REGISTER_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userRegisterActionTypes.USER_REGISTER_SUCCESS:
      return {
        ...state,
        pending: false,
        userInfo: action.payload,
      };
    case userRegisterActionTypes.USER_REGISTER_FAILURE:
      return {
        ...state,
        pending: false,
        userInfo: userSample,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userRegisterReducer;
