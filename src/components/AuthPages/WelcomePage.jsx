import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllLanguagesFunction,
  setLanguageFunction,
} from "../../redux/actions/welcomeActions";
import { Link } from "react-router-dom";
import { LOGIN_PAGE_PATH, REGISTRATIN_PAGE_PATH } from "../../appRouter/consts";

function WelcomePage() {
  const { languages, currentLanguage } = useSelector((state) => state.lang);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllLanguagesFunction());
  }, []);
  console.log(languages);
  console.log(currentLanguage);

  return (
    <div className="welcome__container flex__cl">
      <div className="welcome__page__navbar flex__row">
        <ul className="welcome__page__ul flex__row">
          <li
            onClick={() => dispatch(setLanguageFunction("UK", languages))}
            className="welcome__page__li active"
          >
            UK
          </li>
          <li
            onClick={() => dispatch(setLanguageFunction("ENG", languages))}
            className="welcome__page__li"
          >
            ENG
          </li>
          <li
            onClick={() => dispatch(setLanguageFunction("RUS", languages))}
            className="welcome__page__li"
          >
            RUS
          </li>
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
              href={`mailto:${currentLanguage?.contact?.email}`}
            >
              Email
            </a>
          </span>
          <span className="contact__text">
            <a
              className="contact__text__link"
              target="_blank"
              href={`tel:${currentLanguage?.contact?.phone}`}
            >
              Phone
            </a>
          </span>
          <span className="contact__text">
            <a
              className="contact__text__link"
              target="_blank"
              href={currentLanguage?.contact?.telegram}
            >
              Telegram
            </a>{" "}
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
    </div>
  );
}

export default WelcomePage;
