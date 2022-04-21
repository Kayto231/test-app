import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authFunction, loginFunction } from "../../redux/actions/userActions";

function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { error, isError, allUsers, isLoading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(
      loginFunction({ login: "test@gmail.com", password: 1234 }, allUsers)
      // loginFunction({ login: "test3@gmail.com", password: 1234 }, allUsers)
    );

    setLogin("");
    setPassword("");
  };

  useEffect(() => {
    dispatch(authFunction());
  }, []);

  return (
    <div className="login__container flex__cl">
      {isLoading ? (
        <div className="login__loader">
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          {isError && (
            <div className="login__container__error">{error.message}</div>
          )}
          <form className="login__form flex__cl" action="#">
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
            <button
              type="submut"
              onClick={() => handleLogin()}
              className="login__button button"
            >
              Sign in
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default LoginPage;
