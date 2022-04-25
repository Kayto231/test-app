import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLanguagesFunction,
  setLanguageFunction,
} from "../../redux/actions/welcomeActions";
import { Link } from "react-router-dom";
import { LOGIN_PAGE_PATH, REGISTRATIN_PAGE_PATH } from "../../appRouter/consts";

function WelcomePage() {
  const { languages, currentLanguage, isLoading, contactInfo } = useSelector(
    (state) => state.lang
  );
  console.log(languages);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLanguagesFunction());
  }, []);

  return (
    <div className="welcome__container flex__cl">
      {isLoading ? (
        <div className="welcome__loader">
          <div></div>
          <div></div>
        </div>
      ) : (
        <>
          {" "}
          <div className="welcome__page__navbar flex__row">
            <ul className="welcome__page__ul flex__row">
              {languages.map((lang, i) => (
                <li
                  key={lang.name}
                  onClick={() =>
                    dispatch(setLanguageFunction(lang.name, languages))
                  }
                  className={
                    currentLanguage.lang.name === lang.name
                      ? "welcome__page__li active"
                      : "welcome__page__li"
                  }
                >
                  {lang.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="welcome__page__text flex__cl">
            <div className="welcome__page__header text">
              {currentLanguage?.lang?.header}
            </div>
            <div className="welcome__page__body text">
              {currentLanguage?.lang?.body}
            </div>
            <div className="welcome__page__footer text flex__cl">
              <span className="contact__text">
                <a
                  className="contact__text__link"
                  target="_blank"
                  href={`mailto:${contactInfo?.email}`}
                >
                  Email
                </a>
              </span>
              <span className="contact__text">
                <a
                  className="contact__text__link"
                  target="_blank"
                  href={`tel:${contactInfo?.phone}`}
                >
                  Phone
                </a>
              </span>
              <span className="contact__text">
                <a
                  className="contact__text__link"
                  target="_blank"
                  href={contactInfo?.telegram}
                >
                  Telegram
                </a>{" "}
                <div className="contact__user flex__cl">
                  <p>User api: {`{`}</p>
                  <span className="name">Name: {contactInfo?.tester.name}</span>
                  <span className="email">
                    Email: {contactInfo?.tester.username} // Copy it
                  </span>
                  <span className="password">
                    Password: {contactInfo?.tester.password} // Copy it
                  </span>
                  <p>{`}`}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="link__buttons flex__cl">
            <Link className="button flex__row" to={LOGIN_PAGE_PATH}>
              To sign in
            </Link>
            <Link className="button flex__row" to={REGISTRATIN_PAGE_PATH}>
              To register
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default WelcomePage;
