import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsChatStateAction } from "../../../redux/actions/chatActions";

function ChatHeader() {
  const { isChat, currentFriend } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  return (
    <div className="chat__header flex__row">
      {isChat && (
        <div className="chat__container__profile__block flex__row">
          <div className="chat__container__profile__photo__name flex__row">
            <img
              className="chat__container__profile__photo"
              src="./assets/images/no__profile__photo.jpg"
              alt="no__profile__photo"
            />
            <span className="chat__container__profile__name">
              {currentFriend.name}
            </span>
          </div>

          <div
            onClick={() => dispatch(setIsChatStateAction(!isChat))}
            className="chat__container__profile__get__back flex__row"
          >
            <span>Get back</span>{" "}
            <img
              className="chat__container__profile__block__close__arrow"
              src="./assets/images/close-arrow.png"
              alt="close-arrow"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHeader;
