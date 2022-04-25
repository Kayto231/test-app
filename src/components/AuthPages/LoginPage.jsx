import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loginFunction,
  loginThroughProviderFunction,
} from "../../redux/actions/userActions";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { error, isError, allUsers, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginFunction({ login, password }));

    setLogin("");
    setPassword("");
  };

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
              <Link to={"/auth/register"} className="register__button button">
                Register
              </Link>
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
