import {
  ERROR_WHILE_LOGGIN,
  GET_ALL_USERS,
  LOGIN_INTO_PAGE,
  LOGOUT_USER,
  REGISTRATION,
} from "../consts";

const initialState = {
  currentUser: {},
  allUsers: [],
  isLogged: false,
  isError: false,
  error: {},
  isLoading: true,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTRATION:
      return {
        ...state,
        isLoading: action.payload,
      };
    case LOGOUT_USER:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLogged: action.payload.isLogged,
        error: action.payload.error,
        isError: action.payload.isError,
      };
    case ERROR_WHILE_LOGGIN:
      return {
        ...state,
        isError: action.payload.isError,
        error: action.payload.error,
      };
    case LOGIN_INTO_PAGE:
      return {
        ...state,
        currentUser: action.payload.currentUser,
        isLogged: action.payload.isLogged,
        isLoading: action.payload.isLoading,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
