import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";

import { userReducer } from "../reducers/userReducer";
import { chatReducer } from "../reducers/chatReducer";

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
