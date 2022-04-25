import axios from "axios";
import {
  SET_CURRENT_LANGUAGE,
  SET_LANGUAGE,
} from "../../components/AuthPages/WelcomePageTranslations/const";
import { ALL_LANGUAGES } from "../../URLS/consts";

export const getAllLanguagesAction = (object) => ({
  type: SET_LANGUAGE,
  payload: object,
});
export const setCurrentLanguageAction = (object) => ({
  type: SET_CURRENT_LANGUAGE,
  payload: object,
});

export const getAllLanguagesFunction = () => {
  return async (dispatch) => {
    try {
      const [languageResponse] = await axios
        .get(ALL_LANGUAGES)
        .then((res) => res.data);

      dispatch(getAllLanguagesAction(languageResponse.languages));
      dispatch(
        setCurrentLanguageAction({
          lang: languageResponse.languages[1],
          contact: languageResponse.contact,
        })
      );
    } catch (error) {}
  };
};

export const setLanguageFunction = (string, languages) => {
  return (dispatch) => {
    switch (string) {
      case "uk":
        return dispatch(
          setCurrentLanguageAction({
            lang: languages[1],
            contact: languages.contact,
          })
        );
      case "rus":
        return dispatch(
          setCurrentLanguageAction({
            lang: languages[0],
            contact: languages.contact,
          })
        );
      case "eng":
        return dispatch(
          setCurrentLanguageAction({
            lang: languages[2],
          })
        );
      default:
        return dispatch(
          setCurrentLanguageAction({
            lang: languages.uk,
            contact: languages.contact,
          })
        );
    }
  };
};
