import axios from "axios";
import { fi } from "date-fns/locale";
import { USER_LIST_URL } from "../../URLS/consts";
import {
  ERROR_WHILE_LOGGIN,
  GET_ALL_USERS,
  LOGIN_INTO_PAGE,
  LOGOUT_USER,
} from "../consts";
import { setIsSettingStateAction } from "./chatActions";

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
        el.username === login && el.password === password.toString() ? el : null
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
        const userResponse = await axios
          .get(USER_LIST_URL)
          .then((res) => res.data);

        dispatch(getAllUrers(userResponse));

        const token = localStorage.getItem("token");
        if (!token) {
          dispatch(
            loginAction({ currentUser: {}, isLogged: false, isLoading: false })
          );
        }
        if (token) {
          const currentUser = userResponse.find(
            (el) => el.username === JSON.parse(token)
          );
          currentUser.id = +currentUser.id;
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
        isLogged: false,
        error: {},
        isError: false,
      })
    );
    dispatch(setIsSettingStateAction(false));
  };
};

export const loginThroughProviderFunction = ({ providerObj, allUsers }) => {
  return async (dispatch) => {
    try {
      const currentUser = providerObj.profileObj;
      const isCandidate = allUsers.filter(
        (user) => user.username === currentUser.email
      );

      if (isCandidate.length > 0) {
        const [user] = isCandidate;

        user.id = +user.id;
        localStorage.setItem("token", JSON.stringify(user.username));

        dispatch(
          loginAction({
            currentUser: user,
            isLogged: true,
            isLoading: false,
          })
        );
      } else {
        const newUser = {
          name: currentUser.name,
          createdAt: Date.now(),
          password: "google/Auth",
          username: currentUser.email,
        };

        const currentUserToLogin = await axios
          .post(USER_LIST_URL, newUser)
          .then((res) => res.data);

        currentUserToLogin.id = +currentUserToLogin.id;
        localStorage.setItem(
          "token",
          JSON.stringify(currentUserToLogin.username)
        );

        dispatch(
          loginAction({
            currentUser: currentUserToLogin,
            isLogged: true,
            isLoading: false,
          })
        );
      }
    } catch (error) {}
  };
};
