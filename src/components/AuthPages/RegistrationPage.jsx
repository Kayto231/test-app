import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  changeIsLoadingStateAction,
  registratioinFunction,
} from "../../redux/actions/userActions";

function RegistrationPage() {
  const { isLoading, allUsers } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameDirty, setUsernameDirty] = useState(false);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [usernameError, setUsernameError] = useState(" cannot be empty.");
  const [emailError, setEmailError] = useState(" cannot be empty.");

  const [passwordError, setPasswordError] = useState(" cannot be empty.");
  const [disabled, setDisabled] = useState(true);

  const [errorRegistration, setErrorRegistration] = useState("");
  const [isErrorRegistration, setIsErrorRegistration] = useState(false);

  const dispatch = useDispatch();

  const handleregister = async (e) => {
    e.preventDefault();
    const registerPromise = dispatch(
      registratioinFunction(
        {
          username,
          password,
          email,
        },
        allUsers
      )
    );

    registerPromise
      .then((e) => e)
      .catch((e) => {
        setIsErrorRegistration(true);
        setErrorRegistration(e);
      });
  };
  useEffect(() => {
    if (emailError || passwordError || usernameError) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [emailError, passwordError, usernameError]);

  useEffect(() => {
    setTimeout(() => dispatch(changeIsLoadingStateAction(false)), 1000);
  }, []);

  const usernameHandler = (e) => {
    setUsername(e.target.value);
    if (e.target.value.length < 4) {
      setUsernameError(" cannot be shorter than 4 symbols.");
      if (!e.target.value) {
        setUsernameError(" cannot be empty.");
      }
    } else {
      setUsernameError("");
    }
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if (!re.test(String(e.target.value).toLocaleLowerCase())) {
      setEmailError(" is incorrect.");
      if (!e.target.value) {
        setEmailError(" cannot be empty.");
      }
    } else {
      setEmailError("");
    }
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 4) {
      setPasswordError(" cannot be shorter than 4 symbols.");
      if (!e.target.value) {
        setPasswordError(" cannot be empty.");
      }
    } else {
      setPasswordError("");
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
      case "username":
        setUsernameDirty(true);
        break;
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
    }
  };

  return (
    <div className="register__container flex__cl">
      {isLoading ? (
        <div className="register__loader">
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          <form className="register__form flex__cl">
            {isErrorRegistration && errorRegistration && (
              <div className="register__container__error">
                {errorRegistration}
              </div>
            )}
            <span className="register__form__header">Registration</span>

            <label className="label">
              Username
              {usernameDirty && usernameError && (
                <span className="error">{usernameError}</span>
              )}
            </label>
            <input
              onBlur={(e) => blurHandler(e)}
              className="input input__register"
              type="text"
              name="username"
              placeholder="Type your username"
              value={username}
              onChange={(e) => usernameHandler(e)}
            />
            <label className="label">
              Email
              {emailDirty && emailError && (
                <span className="error">{emailError}</span>
              )}
            </label>
            <input
              onBlur={(e) => blurHandler(e)}
              className="input input__register"
              type="text"
              name="email"
              placeholder="Type your email"
              value={email}
              onChange={(e) => emailHandler(e)}
            />
            <label className="label">
              Password
              {passwordDirty && passwordError && (
                <span className="error">{passwordError}</span>
              )}
            </label>
            <input
              onBlur={(e) => blurHandler(e)}
              className="input input__register"
              type="password"
              name="password"
              placeholder="Type your password"
              value={password}
              onChange={(e) => passwordHandler(e)}
            />
            <div className="btns">
              <button
                onClick={(e) => handleregister(e)}
                disabled={disabled}
                type="submit"
                className="register__button button"
              >
                Register
              </button>
              <Link to={"/auth/login"} className="login__button button">
                Back to login
              </Link>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default RegistrationPage;
