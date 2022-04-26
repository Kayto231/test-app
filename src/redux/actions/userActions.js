import axios from "axios";
import { USER_LIST_URL, VISIT__URL } from "../../URLS/consts";
import {
  ERROR_WHILE_LOGGIN,
  GET_ALL_USERS,
  LOGIN_INTO_PAGE,
  LOGOUT_USER,
  REGISTRATION,
} from "../consts";
import { setIsSettingStateAction } from "./chatActions";

//Action for login
export const loginAction = (object) => ({
  type: LOGIN_INTO_PAGE,
  payload: object,
});
//Action for displaying error if coming
export const errorWhileLogin = (object) => ({
  type: ERROR_WHILE_LOGGIN,
  payload: object,
});

//Action for getting all users
export const getAllUrers = (array) => ({
  type: GET_ALL_USERS,
  payload: array,
});

//Action for logout
export const logOutUserAction = (object) => ({
  type: LOGOUT_USER,
  payload: object,
});

//Action for changing state of loading
export const changeIsLoadingStateAction = (state) => ({
  type: REGISTRATION,
  payload: state,
});

//Function dispatched when clicking sign in
export const loginFunction = ({ login, password }) => {
  return async (dispatch) => {
    try {
      //Getting all users
      const users = await axios.get(USER_LIST_URL).then((res) => res.data);

      //Checking if the login and password match any accounts
      const [currentUser] = users.filter((el) =>
        el.username === login && el.password === password.toString() ? el : null
      );

      //If not, dispatching an error
      if (!currentUser) {
        return dispatch(
          errorWhileLogin({
            isError: true,
            error: { message: "Incorrect login or password" },
          })
        );
      }
      //getting token for farther refreshing witour logging in again
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
      //Timeout for loading :)
      setTimeout(async () => {
        const userResponse = await axios
          .get(USER_LIST_URL)
          .then((res) => res.data);

        dispatch(getAllUrers(userResponse));
        //Againg gaining all users to see the proper one. And not work with old
        const token = localStorage.getItem("token");
        if (!token) {
          setTimeout(() => {
            dispatch(
              loginAction({
                currentUser: {},
                isLogged: false,
                isLoading: false,
              })
            );
          }, 1000);
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

export const registratioinFunction = (
  { username, password, email },
  allUsers
) => {
  return async (dispatch) => {
    try {
      const usersResponse = await axios
        .get(USER_LIST_URL)
        .then((res) => res.data);

      const isExist = usersResponse.filter((user) => user.username === email);

      if (isExist.length > 0)
        return new Promise(function (resolve, reject) {
          reject(`User with this email: ${email} is registered`);
        });

      const currentUser = {
        name: username,
        createdAt: Date.now(),
        password,
        username: email,
      };

      const currentUserResponse = await axios
        .post(USER_LIST_URL, currentUser)
        .then((res) => res.data);

      const token = await currentUserResponse.username;
      localStorage.setItem("token", JSON.stringify(token));
      dispatch(
        loginFunction(
          {
            login: email,
            password,
          },
          allUsers
        )
      );
    } catch (error) {}
  };
};

export const visitFunction = async () => {
  await axios.post(VISIT__URL, { createdAt: Date.now() });
};
