import {
  SET_CURRENT_LANGUAGE,
  SET_LANGUAGE,
} from "../../components/AuthPages/WelcomePageTranslations/const";

const initialState = {
  languages: [],
  currentLanguage: {},
};

export const welcomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LANGUAGE:
      return {
        ...state,
        languages: action.payload,
      };
    case SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
