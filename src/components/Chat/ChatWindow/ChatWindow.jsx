import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArrivalMessageFunction } from "../../../redux/actions/chatActions";
import { CONVERSATION_URL } from "../../../URLS/consts";
import Message from "../Message/Message";

function ChatWindow() {
  const { currentChat, arrivalMessage, currentConversation } = useSelector(
    (state) => state.chat
  );
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    arrivalMessage &&
      currentConversation?.members.includes(arrivalMessage?.senderId) &&
      dispatch(getArrivalMessageFunction({ arrivalMessage, currentChat }));
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
