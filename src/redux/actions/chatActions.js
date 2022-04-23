import axios from "axios";
import { now } from "moment";
import {
  CONVERSATION_URL,
  MESSAGES_URL,
  RANDOME_JOKE_URL,
} from "../../URLS/consts";
import {
  GET_CONVERSATIONS,
  LOAD_MESSAGES,
  SEND_NEW_MESSAGE,
  SET_ARRIVAL_MESSAGE,
  SET_IS_CHAT_STATE,
  SET_IS_SETTINGS_STATE,
  SET_SEARCH_INPUT,
} from "../consts";

export const changeSearchInputAction = (string) => ({
  type: SET_SEARCH_INPUT,
  payload: string,
});
export const fetchConversationsAction = (array) => ({
  type: GET_CONVERSATIONS,
  payload: array,
});

export const setCurrentMessagesAction = (object) => ({
  type: LOAD_MESSAGES,
  payload: object,
});

export const setIsChatStateAction = (state) => ({
  type: SET_IS_CHAT_STATE,
  payload: state,
});

export const sendNewMessageAction = (array) => ({
  type: SEND_NEW_MESSAGE,
  payload: array,
});
export const setIsSettingStateAction = (state) => ({
  type: SET_IS_SETTINGS_STATE,
  payload: state,
});
export const setArrivalMessageAction = (object) => ({
  type: SET_ARRIVAL_MESSAGE,
  payload: object,
});

export const fetchConversationsFuncton = (currentUser) => {
  return async (dispatch) => {
    try {
      const sortedArray = await getAndSortAllConversationFunction({
        currentUser,
      });

      dispatch(fetchConversationsAction(sortedArray));
    } catch (error) {
      console.log(error);
    }
  };
};

export const setCurrentMessagesFunction = ({
  currentConversation,
  currentUser,
  friendObject,
}) => {
  return async (dispatch) => {
    try {
      const messagesResponse = await axios
        .get(MESSAGES_URL)
        .then((res) => res.data);

      const filteredMessages = messagesResponse.filter(
        (el) => el.conversationId === currentConversation.convId
      );
      if (currentConversation.isSeen === false) {
        dispatch(
          changeConversationStateFunction({
            currentConversation,
            currentUser,
            message: currentConversation.lastMessage,
            state: true,
          })
        );
      }

      dispatch(
        setCurrentMessagesAction({
          isChat: true,
          currentChat: filteredMessages,
          currentConversation,
          currentFriend: friendObject,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const sendNewMessageFunction = ({
  currentChat,
  currentUser,
  currentFriend,
  currentConversation,
  message,
}) => {
  return async (dispatch) => {
    try {
      const newMessage = {
        conversationId: currentConversation.convId,
        senderId: currentUser.id,
        message,
        createdAt: Date.now(),
      };

      await axios.post(MESSAGES_URL, newMessage);

      const updatedCurrentChat = [...currentChat, newMessage];
      dispatch(sendNewMessageAction(updatedCurrentChat));

      dispatch(
        changeConversationStateFunction({
          currentConversation,
          currentUser,
          message: newMessage.message,
          state: true,
        })
      );
      dispatch(
        sendJokeMessage({
          currentFriend,
          currentConversation,
          currentUser,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
};

export const getAndSortAllConversationFunction = async ({ currentUser }) => {
  const allConversations = await getConversations();
  const filteredConverstaions = allConversations.filter((el) =>
    el.members.includes(currentUser.id)
  );
  const sortedArray = filteredConverstaions.sort(
    (a, b) => b.createdAt - a.createdAt
  );
  return sortedArray;
};
export const getConversations = async () => {
  const data = await axios.get(CONVERSATION_URL).then((res) => res.data);
  return data;
};

export const changeConversationStateFunction = ({
  currentConversation,
  currentUser,
  message,
  state,
}) => {
  return async (dispatch) => {
    try {
      const conversationToEdit = {
        members: currentConversation.members,
        lastMessage: message,
        isSeen: state,
        createdAt: Date.now(),
        convId: currentConversation.convId,
        id: currentConversation.id,
      };

      await axios.put(
        CONVERSATION_URL + `/${currentConversation.id}`,
        conversationToEdit
      );
      const sortedArray = await getAndSortAllConversationFunction({
        currentUser,
      });
      dispatch(fetchConversationsAction(sortedArray));
    } catch (error) {}
  };
};

export const sendJokeMessage = ({
  currentFriend,
  currentConversation,
  currentUser,
}) => {
  return async (dispatch) => {
    try {
      setTimeout(async () => {
        const randomJokeResponse = await axios
          .get(RANDOME_JOKE_URL)
          .then((res) => res.data);

        const newMessage = {
          conversationId: currentConversation.convId,
          senderId: currentFriend.id,
          message: randomJokeResponse.value,
          createdAt: Date.now(),
        };

        dispatch(
          changeConversationStateFunction({
            currentConversation,
            currentUser,
            message: newMessage.message,
            state: false,
          })
        );
        dispatch(setArrivalMessageAction(newMessage));
        await axios.post(MESSAGES_URL, newMessage);
      }, 10000);
    } catch (error) {
      console.log(error);
    }
  };
};

export const getArrivalMessageFunction = ({ arrivalMessage, currentChat }) => {
  return async (dispatch) => {
    try {
      const updatedMessages = [...currentChat, arrivalMessage];
      dispatch(sendNewMessageAction(updatedMessages));
    } catch (error) {
      console.log(error);
    }
  };
};

export const startNewConversation = ({ currentUser, user }) => {
  return async (dispatch) => {
    try {
      const filteredConversations = await axios
        .get(CONVERSATION_URL)
        .then((res) =>
          res.data.filter((el) =>
            el.members.includes(currentUser.id && user.id)
          )
        );
      const conversationToPost = {
        members: [currentUser.id, user.id],
        lastMessage: "",
        isSeen: true,
        createdAt: Date.now(),
        convId: Math.random(),
        id: Math.random(),
      };

      if (filteredConversations.length === 0) {
        const response = await axios.post(CONVERSATION_URL, conversationToPost);

        dispatch(
          setCurrentMessagesFunction({
            currentConversation: response.data,
            currentUser,
            friendObject: user,
          })
        );
        dispatch(fetchConversationsFuncton({ currentUser }));
      } else {
        const currentConversation = filteredConversations.find((el) =>
          el.members.includes(user.id && currentUser.id)
        );
        dispatch(
          setCurrentMessagesFunction({
            currentConversation,
            currentUser,
            friendObject: user,
          })
        );
      }
    } catch (error) {}
  };
};

// {
//   "members": [
//    2,
//    3
//   ],
//   "lastMessage": "Hello Alex.",
//   "isSeen": false,
//   "createdAt": 1650548200926,
//   "convId": 0,
//   "id": "0"
//  },
