import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  authFunction,
  loginFunction,
  loginThroughProviderFunction,
} from "../../redux/actions/userActions";
import GoogleLogin from "react-google-login";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { error, isError, allUsers, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(
      loginFunction({ login, password }, allUsers)
      // loginFunction({ login: "test@gmail.com", password: 1234 }, allUsers)
    );

    setLogin("");
    setPassword("");
  };
  useEffect(() => {
    dispatch(authFunction());
  }, []);

  const loginThroughProvider = (providerObj) => {
    dispatch(loginThroughProviderFunction({ providerObj, allUsers }));
  };
  return (
    <div className="login__container flex__cl">
      {isLoading ? (
        <div className="login__loader">
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <form className="login__form flex__cl" onSubmit={handleLogin}>
            {isError && (
              <div className="login__container__error">{error.message}</div>
            )}
            <span className="login__form__header">Login</span>
            <input
              className="input input__login"
              type="text"
              placeholder="Type your login"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
            />
            <input
              className="input input__login"
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btns">
              <button type="submut" className="login__button button">
                Sign in
              </button>
              <GoogleLogin
                className="google__button button"
                clientId="545556659238-v889rnr15ivn0e3p11ds753akh262ftm.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={loginThroughProvider}
                onFailure={loginThroughProvider}
              />
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default LoginPage;
