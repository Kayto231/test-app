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
      const [language] = await axios.get(ALL_LANGUAGES).then((res) => res.data);
      console.log(language);
      dispatch(getAllLanguagesAction(language));
      dispatch(
        setCurrentLanguageAction({
          lang: language.uk,
          contact: language.contact,
        })
      );
    } catch (error) {}
  };
};

export const setLanguageFunction = (string, languages) => {
  return (dispatch) => {
    switch (string) {
      case "UK":
        return dispatch(
          setCurrentLanguageAction({
            lang: languages.uk,
            contact: languages.contact,
          })
        );
      case "RUS":
        return dispatch(
          setCurrentLanguageAction({
            lang: languages.rus,
            contact: languages.contact,
          })
        );
      case "ENG":
        return dispatch(
          setCurrentLanguageAction({
            lang: languages.eng,
            contact: languages.contact,
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
