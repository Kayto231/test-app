import axios from "axios";
import { USER_LIST_URL } from "../../URLS/consts";
import {
  ERROR_WHILE_LOGGIN,
  GET_ALL_USERS,
  LOGIN_INTO_PAGE,
  LOGOUT_USER,
} from "../consts";

export const loginAction = (object) => ({
  type: LOGIN_INTO_PAGE,
  payload: object,
});
export const errorWhileLogin = (object) => ({
  type: ERROR_WHILE_LOGGIN,
  payload: object,
});
export const getAllUrers = (array) => ({
  type: GET_ALL_USERS,
  payload: array,
});

export const logOutUserAction = (object) => ({
  type: LOGOUT_USER,
  payload: object,
});

export const loginFunction = ({ login, password }, users) => {
  return async (dispatch) => {
    try {
      const [currentUser] = users.filter((el) =>
        el.username === login && el.password === password ? el : null
      );

      if (!currentUser) {
        return dispatch(
          errorWhileLogin({
            isError: true,
            error: { message: "Incorrect login or password" },
          })
        );
      }
      const token = currentUser.username;

      localStorage.setItem("token", JSON.stringify(token));
      dispatch(loginAction({ currentUser, isLogged: true, isLoading: false }));
    } catch (error) {
      console.log(error);
    }
  };
};

export const authFunction = () => {
  return async (dispatch) => {
    try {
      setTimeout(async () => {
        const response = await axios.get(USER_LIST_URL);
        const usersList = response.data[0];
        const users = usersList.users;
        dispatch(getAllUrers(users));

        const token = localStorage.getItem("token");
        if (!token) {
          dispatch(
            loginAction({ currentUser: {}, isLogged: false, isLoading: false })
          );
        }
        if (token) {
          const currentUser = users.find(
            (el) => el.username === JSON.parse(token)
          );
          dispatch(
            loginAction({ currentUser, isLogged: true, isLoading: false })
          );
        }
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };
};

export const logOutUserFunction = () => {
  return (dispatch) => {
    localStorage.removeItem("token");
    dispatch(
      logOutUserAction({
        currentUser: {},
        allUsers: [],
        isLogged: false,
      })
    );
  };
};
