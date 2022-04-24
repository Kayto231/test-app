import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArrivalMessageFunction } from "../../../redux/actions/chatActions";
import Message from "../Message/Message";

function ChatWindow() {
  const { currentChat, currentConversation, arrivalMessage, currentFriend } =
    useSelector((state) => state.chat);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage?.senderId) &&
      dispatch(
        getArrivalMessageFunction({
          currentConversation,
          currentUser,
          currentFriend,
        })
      );
  }, [arrivalMessage]);

  return (
    <div className="chat__body flex__cl">
      <ul className="chat__body__messages">
        {currentChat.map((el, i) => {
          return (
            <Message
              key={i}
              senderId={el.senderId === currentUser.id ? "me" : ""}
              message={el.message}
              createdAt={el.createdAt}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ChatWindow;
