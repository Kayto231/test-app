import LoginPage from "../components/AuthPages/LoginPage";
import RegistrationPage from "../components/AuthPages/RegistrationPage";
import Chat from "../components/Chat/Chat";
import {
  CHAT_PAGE_PATH,
  LOGIN_PAGE_PATH,
  REGISTRATIN_PAGE_PATH,
} from "./consts";

export const publicRoutes = [
  {
    path: LOGIN_PAGE_PATH,
    element: LoginPage,
  },
  {
    path: REGISTRATIN_PAGE_PATH,
    element: RegistrationPage,
  },
];

export const privateRoutes = [
  {
    path: CHAT_PAGE_PATH,
    element: Chat,
  },
];
