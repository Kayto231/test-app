import axios from "axios";
import {
  SET_CONTACT,
  SET_CURRENT_LANGUAGE,
  SET_LANGUAGE,
} from "../../components/AuthPages/WelcomePageTranslations/const";
import { ALL_LANGUAGES, VISIT__URL } from "../../URLS/consts";

export const getAllLanguagesAction = (object) => ({
  type: SET_LANGUAGE,
  payload: object,
});
export const setCurrentLanguageAction = (object) => ({
  type: SET_CURRENT_LANGUAGE,
  payload: object,
});
export const setContactsAction = (object) => ({
  type: SET_CONTACT,
  payload: object,
});

export const getAllLanguagesFunction = () => {
  return async (dispatch) => {
    try {
      setTimeout(async () => {
        const [languageResponse] = await axios
          .get(ALL_LANGUAGES)
          .then((res) => res.data);

        dispatch(setContactsAction(languageResponse.contact));
        dispatch(getAllLanguagesAction(languageResponse.languages));
        dispatch(
          setCurrentLanguageAction({
            lang: languageResponse.languages[1],
          })
        );
      }, 1500);
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
          })
        );
      case "rus":
        return dispatch(
          setCurrentLanguageAction({
            lang: languages[0],
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
            lang: languages[1],
            contact: languages.contact,
          })
        );
    }
  };
};
