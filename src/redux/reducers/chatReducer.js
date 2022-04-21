import {
  SET_ARRIVAL_MESSAGE,
  GET_CONVERSATIONS,
  LOAD_MESSAGES,
  SEND_NEW_MESSAGE,
  SET_IS_CHAT_STATE,
  SET_IS_SETTINGS_STATE,
  SET_SEARCH_INPUT,
} from "../consts";

const initialState = {
  isSettings: false,
  currentConversations: [],
  isChat: false,
  currentChat: [],
  currentConversation: {},
  currentFriend: {},
  arrivalMessage: {},
  searchContactInput: "s",
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SEARCH_INPUT:
      return {
        ...state,
        searchContactInput: action.payload,
      };
    case SET_ARRIVAL_MESSAGE:
      return {
        ...state,
        arrivalMessage: action.payload,
      };
    case SEND_NEW_MESSAGE:
      return {
        ...state,
        currentChat: action.payload,
      };
    case SET_IS_SETTINGS_STATE:
      return {
        ...state,
        isSettings: action.payload,
      };
    case SET_IS_CHAT_STATE:
      return {
        ...state,
        isChat: action.payload,
      };
    case LOAD_MESSAGES:
      return {
        ...state,
        isChat: action.payload.isChat,
        currentChat: action.payload.currentChat,
        currentConversation: action.payload.currentConversation,
        currentFriend: action.payload.currentFriend,
      };
    case GET_CONVERSATIONS:
      return {
        ...state,
        currentConversations: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
