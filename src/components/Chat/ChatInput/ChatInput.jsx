import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sendNewMessageFunction } from "../../../redux/actions/chatActions";

function ChatInput() {
  const [message, setMessage] = useState("");
  const { currentChat, currentConversation, isChat, currentConversations } =
    useSelector((state) => state.chat);

  const { currentUser } = useSelector((state) => state.user);
  const { currentFriend } = useSelector((state) => state.chat);

  const dispatch = useDispatch();

  const sendMessage = () => {
    dispatch(
      sendNewMessageFunction({
        currentChat,
        currentUser,
        currentFriend,
        currentConversation,
        currentConversations,
        message,
      })
    );
    setMessage("");
  };
  return (
    <div className="chat__footer flex__cl">
      <div className="chat__footer__input__block flex__row">
        <input
          className="input"
          type="text"
          placeholder="Type your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        {isChat && (
          <img
            onClick={() => sendMessage()}
            className="send__button"
            src="./assets/images/send-button_icon.svg"
            alt="send-button_icon"
          />
        )}
      </div>
    </div>
  );
}

export default ChatInput;
