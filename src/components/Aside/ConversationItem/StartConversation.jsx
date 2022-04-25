import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  changeSearchInputAction,
  startNewConversation,
} from "../../../redux/actions/chatActions";

function StartConversation({ user }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => {
        dispatch(startNewConversation({ currentUser, user }));
        dispatch(changeSearchInputAction(""));
      }}
      className="aside__conversation__item"
    >
      <div className="conversation__item__block">
        <img
          className="conversation__item__photo"
          src="./assets/images/no__profile__photo.jpg"
          alt="no__profile__photo"
        />
        <div className="bio__block flex__cl">
          {" "}
          <div className="conversation__item__name">
            {user.name === currentUser.name ? "Me" : user.name}
          </div>
          <div className="conversation__item__last__message"></div>
        </div>
      </div>
    </div>
  );
}

export default StartConversation;
