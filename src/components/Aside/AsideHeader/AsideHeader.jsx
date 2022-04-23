import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchInputAction,
  setIsSettingStateAction,
} from "../../../redux/actions/chatActions";
import { logOutUserFunction } from "../../../redux/actions/userActions";

function AsideHeader() {
  const { currentUser } = useSelector((state) => state.user);
  const { isSettings, searchContactInput } = useSelector((state) => state.chat);
  const [searchInput, setSearchInput] = useState("");
  const dispatch = useDispatch();

  return (
    <div className="aside__header flex__cl">
      <div className="aside__header__block flex__row">
        <div className="aside__header__block__photo__name flex__row">
          <img
            className="aside__header__user__photo"
            src="./assets/images/no__profile__photo.jpg"
            alt="no__profile__photo"
          />
          <span className="aside__header__user__name"> {currentUser.name}</span>
        </div>

        <img
          onClick={() => dispatch(setIsSettingStateAction(!isSettings))}
          className="aside__header__settings"
          src="./assets/images/settings.svg"
          alt="settings"
        />
        <div
          className={
            isSettings ? "dropdown__menu" : "dropdown__menu display__none"
          }
        >
          <span
            onClick={() => dispatch(logOutUserFunction())}
            className="dropdown__menu__item"
          >
            Logout
          </span>
        </div>
      </div>
      <div className="aside__input__block">
        <input
          className="aside__header__input"
          type="text"
          placeholder="Search or start a new chat"
          value={searchContactInput}
          onChange={(e) => dispatch(changeSearchInputAction(e.target.value))}
        />
        <img
          className="aside__search__png"
          src="./assets/images/search.png"
          alt="search"
        />
      </div>
    </div>
  );
}
export default AsideHeader;
