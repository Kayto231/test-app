import React from "react";
import { useSelector } from "react-redux";
import { Link, Routes, Route, Navigate } from "react-router-dom";
import { CHAT_PAGE_PATH, LOGIN_PAGE_PATH, WELCOME_PAGE_PATH } from "./consts";
import { privateRoutes, publicRoutes } from "./Routes";

function AppRouter() {
  const { isLogged } = useSelector((state) => state.user);

  return (
    <>
      {isLogged ? (
        <>
          <Routes>
            {privateRoutes.map((el) => (
              <Route key={el.path} path={el.path} element={<el.element />} />
            ))}
            <Route path="*" element={<Navigate to={CHAT_PAGE_PATH} />} />
          </Routes>
        </>
      ) : (
        <>
          {" "}
          <Routes>
            {publicRoutes.map((el) => (
              <Route key={el.path} path={el.path} element={<el.element />} />
            ))}
            <Route path="*" element={<Navigate to={WELCOME_PAGE_PATH} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default AppRouter;
