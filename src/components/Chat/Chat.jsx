import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchConversationsFuncton } from "../../redux/actions/chatActions";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatInput from "./ChatInput/ChatInput";
import ChatWindow from "./ChatWindow/ChatWindow";
import AsideHeader from "../Aside/AsideHeader/AsideHeader";
import AsideChats from "../Aside/AsideChats/AsideChats";

function Chat() {
  const { currentUser } = useSelector((state) => state.user);
  const { isChat } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchConversationsFuncton(currentUser));
  }, []);

  return (
    <>
      <div
        className={
          isChat ? "aside__bar flex__cl display__none" : "aside__bar flex__cl"
        }
      >
        <AsideHeader />
        <AsideChats />
      </div>
      <div
        className={
          isChat
            ? "chat__container flex__cl"
            : "chat__container flex__cl display__none"
        }
      >
        <ChatHeader />
        {isChat ? (
          <ChatWindow />
        ) : (
          <div className="chat__container__empty flex__cl">
            Choose a conversation or start a new one
          </div>
        )}
        <ChatInput />
      </div>
    </>
  );
}

export default Chat;
