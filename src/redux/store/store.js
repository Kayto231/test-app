import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "../reducers/userReducer";
import { chatReducer } from "../reducers/chatReducer";
import { welcomeReducer } from "../reducers/welcomeReducer";

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
  lang: welcomeReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
