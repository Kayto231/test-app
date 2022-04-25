import {
  SET_CONTACT,
  SET_CURRENT_LANGUAGE,
  SET_LANGUAGE,
} from "../../components/AuthPages/WelcomePageTranslations/const";

const initialState = {
  languages: [],
  currentLanguage: [],
  contactInfo: {},
  isLoading: true,
};

export const welcomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACT:
      return {
        ...state,
        contactInfo: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        languages: action.payload,
        isLoading: false,
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
