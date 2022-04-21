import React from "react";
import { useSelector } from "react-redux";
import ConversationItem from "../ConversationItem/ConversationItem";

function AsideChats() {
  const { currentConversations } = useSelector((state) => state.chat);

  return (
    <div className="aside__chats flex__cl">
      <span className="aside__chats__label flex__cl">Chats</span>
      <div className="aside__conversations flex__cl">
        {currentConversations.map((el, i) => {
          return (
            <ConversationItem
              key={i}
              Conversation={el}
              membersList={el.members}
              createdAt={el.createdAt}
              lastMessage={el.lastMessage}
              isSeen={el.isSeen}
            />
          );
        })}
      </div>
    </div>
  );
}

export default AsideChats;
