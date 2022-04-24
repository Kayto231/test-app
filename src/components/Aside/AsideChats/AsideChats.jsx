import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ConversationItem from "../ConversationItem/ConversationItem";
import StartConversation from "../ConversationItem/StartConversation";

function AsideChats() {
  const { currentConversations, searchContactInput } = useSelector(
    (state) => state.chat
  );
  const { allUsers, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const filteredUsers = allUsers.filter((el) => el.id !== currentUser.id);
  console.log(filteredUsers);
  return (
    <div className="aside__chats flex__cl">
      <span className="aside__chats__label flex__cl">Chats</span>
      <div className="aside__conversations flex__cl">
        {searchContactInput.length > 0
          ? filteredUsers
              .filter((el) =>
                el.name.toLowerCase().includes(searchContactInput.toLowerCase())
              )
              .map((el, i) => <StartConversation key={i} user={el} />)
          : currentConversations.map((el, i) => {
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
