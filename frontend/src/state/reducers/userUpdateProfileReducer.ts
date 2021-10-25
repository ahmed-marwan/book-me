import { userUpdateProfileActionTypes } from '../action-types/userActionTypes';
import {
  UserUpdateProfileActions,
  UserProfileState,
} from '../types/userUpdateProfileTypes';

const userProfileSample = {
  _id: '',
  name: '',
  email: '',
  password: '',
  token: '',
  success: false,
};

const userProfileInitialState: UserProfileState = {
  pending: false,
  userProfile: userProfileSample,
  error: null,
};

const userUpdateProfileReducer = (
  state = userProfileInitialState,
  action: UserUpdateProfileActions
) => {
  switch (action.type) {
    case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        pending: false,
        userProfile: {
          ...action.payload,
          success: true,
        },
      };
    case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload,
      };
    case userUpdateProfileActionTypes.USER_UPDATE_PROFILE_RESET:
      return userProfileInitialState;

    default:
      return state;
  }
};

export default userUpdateProfileReducer;
