import { userLoginActionTypes } from '../action-types/userActionTypes';
import { UserLoginActions, UserState } from '../types/userLoginTypes';

const userSample = {
  _id: '',
  name: '',
  email: '',
  password: '',
};

export const userLoginInitialState: UserState = {
  pending: false,
  userInfo: userSample,
  error: null,
};

const userLoginReducer = (
  state = userLoginInitialState,
  action: UserLoginActions
) => {
  switch (action.type) {
    case userLoginActionTypes.USER_LOGIN_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userLoginActionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        pending: false,
        userInfo: action.payload,
      };
    case userLoginActionTypes.USER_LOGIN_FAILURE:
      return {
        ...state,
        pending: false,
        userInfo: userSample,
        error: action.payload,
      };

    case userLoginActionTypes.USER_LOGOUT:
      return {
        ...state,
        pending: false,
        userInfo: userSample,
      };

    default:
      return state;
  }
};

export default userLoginReducer;
