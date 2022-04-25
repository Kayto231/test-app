import React from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { setCurrentMessagesFunction } from "../../../redux/actions/chatActions";

function ConversationItem({
  membersList,
  Conversation,
  lastMessage,
  createdAt,
  isSeen,
}) {
  const { allUsers, currentUser } = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);

  const [friendId] = membersList.filter((id) => +id !== +currentUser?.id);

  const [friendObject] = allUsers.filter((user) => +user.id === +friendId);
  const dispatch = useDispatch();

  const formatedTime = new Date(createdAt);
  return (
    <div
      onClick={() => {
        dispatch(
          setCurrentMessagesFunction({
            currentConversation: Conversation,
            currentUser,
            currentFriend: friendObject,
          })
        );
      }}
      className={
        chat.currentConversation.convId === Conversation.convId
          ? "aside__conversation__item selected"
          : "aside__conversation__item"
      }
    >
      <div className="conversation__item__block">
        <img
          className="conversation__item__photo"
          src="./assets/images/no__profile__photo.jpg"
          alt="no__profile__photo"
        />
        <div className="bio__block flex__cl">
          {" "}
          <div className="conversation__item__name">{friendObject?.name}</div>
          <div className="conversation__item__last__message">{lastMessage}</div>
        </div>
      </div>
      <span className="aside__conversation__item__time">
        {moment(formatedTime).fromNow()}
      </span>
      {!isSeen && <div className="conversation__item__not__seen__block"></div>}
    </div>
  );
}

export default ConversationItem;
