import React, { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import moment from "moment";

function Message({ senderId = "", message, createdAt }) {
  const { currentChat } = useSelector((state) => state.chat);

  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentChat]);

  const newDate = new Date(createdAt);
  const formatedTime =
    moment(newDate).format("l") + " " + moment(newDate).format("LT");

  return (
    <li
      ref={scrollRef}
      className={`chat__body__message__block ${senderId} flex__cl`}
    >
      <div className="chat__body__message__and__photo flex__row">
        <img
          className="chat__body__message__photo"
          src="./assets/images/no__profile__photo.jpg"
          alt="no__profile__photo"
        />
        <span className="chat__body__message">{message}</span>
      </div>
      <div className="chat__body__message__time">{formatedTime}</div>
    </li>
  );
}

export default Message;
