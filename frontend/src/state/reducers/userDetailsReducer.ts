import { userDetailsActionTypes } from '../action-types/userActionTypes';
import {
  UserDetailsActions,
  UserDetailsState,
} from '../types/userDetailsTypes';

const userDetailsSample = {
  _id: '',
  name: '',
  email: '',
  password: '',
  token: '',
};

const userDetailsInitialState: UserDetailsState = {
  pending: false,
  userDetails: userDetailsSample,
  error: null,
};

const userDetailsReducer = (
  state = userDetailsInitialState,
  action: UserDetailsActions
) => {
  switch (action.type) {
    case userDetailsActionTypes.USER_DETAILS_REQUEST:
      return {
        ...state,
        pending: true,
      };
    case userDetailsActionTypes.USER_DETAILS_SUCCESS:
      return {
        ...state,
        pending: false,
        userDetails: action.payload,
      };
    case userDetailsActionTypes.USER_DETAILS_FAILURE:
      return {
        ...state,
        pending: false,
        userDetails: userDetailsSample,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default userDetailsReducer;
